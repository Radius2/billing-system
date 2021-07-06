import {
    Box,
    Button,
    Paper,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HistoryIcon from '@material-ui/icons/History';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {LanguageContext} from '../../../App';
import {handbooks} from '../../../util/handbook';
import {INTERFACE_LANGUAGE} from '../../../util/language';
import PreventActionDialog from '../../Util/PreventActionDialog';
import Handbook from '../Handbook';
import HistoryElement from '../HistoryElement/HistoryElement';
import TooltipButton from '../TooltipButton';
import DeleteDialog from './DeleteDialog';
import InputSwitch from './InputSwitch';
import useStyle from './oneElementStyle';
import * as api from '../../../api/api'

function newElement(columns, preparedValue = {}) {
    const newArr = {}
    columns.forEach(({accessor}) => accessor.toUpperCase() === 'ID' ? null : newArr[accessor] = '')
    return {...newArr, ...preparedValue}
}

function validationReduce(obj = {}) {
    return Object.values(obj).reduce((prev, cur) => prev && cur, true)
}

function changeReduce(obj = {}) {
    return Object.values(obj).reduce((prev, cur) => prev || cur, false)
}

export default function OneElement({open, submitHandler, cancelHandler, subValue, preparedValue = {}}) {
    const {handbookName, id: idElement} = subValue // название формы
    const [columns, setColumns] = useState(handbooks[handbookName].columns); //шапка формы
    useEffect(() => setColumns(handbooks[handbookName].columns), [subValue.handbookName])

    const {lang} = useContext(LanguageContext);
    const classes = useStyle();
    const [elementData, setElementData] = useState({});
    const [editing, setEditing] = useState(true);
    const [loading, setLoading] = useState(true);
    const [isValidArray, setIsValidArray] = useState({});
    const [isChangedArray, setIsChangedArray] = useState({});
    const [isValidElement, setIsValidElement] = useState(true);
    const [isChangedElement, setIsChangedElement] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    useEffect(() => {
        setIsValidElement(validationReduce(isValidArray))
    }, [isValidArray])

    useEffect(() => {
        setIsChangedElement(changeReduce(isChangedArray))
    }, [isChangedArray])

    useEffect(() => {
        if (idElement.toUpperCase() === 'ADD' || idElement === 0) {
            setLoading(false);
            return setElementData(newElement(columns, preparedValue))
        }
        api.getElementHandbook(handbookName, +idElement)
            .then(({data}) => setElementData(data))
            .catch(() => console.log('error'))
            .finally(() => setLoading(false))
    }, [handbookName])

    function addElement() {
        api.addElementHandbook(handbookName, elementData)
            .then(({data}) => {
                submitHandler(data, elementData)
                cancelHandler()
            })
            .catch(() => console.log('err'))
    }

    function updateElement() {
        api.updElementHandbook(handbookName, elementData)
            .then((resp) => submitHandler(resp))
            .catch(() => console.log('err'))
    }

    function actionButtonHandler() {
        (idElement.toUpperCase() === 'ADD') ? addElement() : updateElement()
    }

    function closeHandler(cancel) {
        return isChangedElement ? setOpenDialog(true) : cancelHandler()
    }

    const input = useCallback((column, value) => {
        return <InputSwitch
            key={column.accessor + (column.subPath?.accessor ?? '')}
            column={column}
            value={value}
            lang={lang}
            updateValues={(value) => {
                console.log(value, 'one')
                setElementData(prev => ({...prev, [column.accessor]: value}))
            }}
            editing={editing}
            setIsValidArray={(value) => setIsValidArray(prev => ({...prev, [column.accessor]: !!value}))}
            setIsChangedArray={(value) => setIsChangedArray(prev => ({...prev, [column.accessor]: !!value}))}
        />
    }, [editing, lang, setIsValidArray])

    return (
        <Dialog
            open={open}
            maxWidth={false}
            fullScreen={handbookName === 'subjects'}
            className={classes.root}
            onClose={closeHandler}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <Box
                style={{width: handbooks[handbookName].maxWidth}}>

                {/*окно удаления с историей*/}
                <DeleteDialog
                    openDialog={openDeleteModal}
                    deleteHandler={(closeTime) => {
                        api.delElementHandbookWithTime(handbookName, +idElement, {[handbooks[handbookName].deleteAccessor]:closeTime})
                            .then(submitHandler)
                            .catch(err => console.log(err.message))
                    }}
                    closeHandler={() => setOpenDeleteModal(false)}/>

                {/*окно "вы точно хотите выйти" если изменили данные*/}
                <PreventActionDialog openDialog={openDialog}
                                     submitHandler={() => setOpenDialog(false)}
                                     cancelHandler={cancelHandler}/>

                {/*история изменений*/}
                {openHistory ?
                    <HistoryElement open={openHistory} onClose={() => setOpenHistory(false)} handbookName={handbookName}
                                    id={idElement}/>
                    : null
                }
                <Box component={Paper} className={classes.container}>
                    <Box className={classes.namePanel}>
                        <Box>
                            {idElement.toUpperCase() !== 'ADD' ?
                                <Typography variant={'subtitle1'}>
                                    {`ID: ${idElement}`}
                                </Typography>
                                : null}
                            <Typography variant={'h6'}>
                                {handbooks[handbookName].name[lang]}
                            </Typography>
                        </Box>
                        {handbooks[handbookName].hasHistory && idElement.toLowerCase() !== 'add' &&
                        <>
                            <TooltipButton
                                size='medium'
                                tooltipTitle={INTERFACE_LANGUAGE.delete[lang]}
                                actionHandler={() => {
                                    setOpenDeleteModal(true)
                                }}
                                icon={<DeleteForeverIcon fontSize='default'/>}
                            />
                            <TooltipButton
                                size='medium'
                                tooltipTitle='История'
                                actionHandler={() => setOpenHistory(true)}
                                icon={<HistoryIcon/>}/>
                        </>}
                    </Box>
                    <Divider/>
                    {loading ? null : (
                        <>
                            {columns.map(column => column.mainValue ? input(column, elementData[column.accessor]) : null)}
                            <Divider/>
                            {columns.map((column, index) => {
                                return <React.Fragment key={column.accessor + index}>
                                    {!column.mainValue ? input(column, elementData[column.accessor]) : null}
                                    {column.break ? <Divider/> : null}
                                </React.Fragment>
                            })}
                        </>
                    )}
                    <Divider/>
                    {
                        editing ? <Box
                            className={classes.actionPanel}>
                            <Button disabled={!isValidElement}
                                    size="large" color='primary'
                                    onClick={actionButtonHandler}>Сохранить</Button>
                            <Button size="large" onClick={closeHandler}>Отмена</Button>
                        </Box> : null}
                </Box>
                {handbooks[handbookName].bindingData && idElement.toUpperCase() !== 'ADD' ?
                    <Handbook handbook={handbooks[handbookName].bindingData.handbookName}
                              bindingVariant
                              preparedFilter={{
                                  accessor: handbooks[handbookName].bindingData.filter,
                                  id: idElement,
                                  preparedValue: {[handbooks[handbookName].bindingData.preparedAccessor]: elementData}
                              }}/> : null}
            </Box>
        </Dialog>
    )
}