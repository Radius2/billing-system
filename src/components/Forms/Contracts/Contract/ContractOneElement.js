import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
    Typography, Tabs, Tab, withStyles
} from '@material-ui/core';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import * as api from '../../../../api/api';
import {LanguageContext} from '../../../../App';
import {INTERFACE_LANGUAGE} from '../../../../util/language';
import InputSwitch from '../../../Handbook/OneElement/InputSwitch';
import useStyle from '../../../Handbook/OneElement/oneElementStyle';
import {TabPanel} from '../../../Util/TabPanel';
import {structureTable} from '../contractStructure';

const AntTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 80,
            width: '100%',
            backgroundColor: 'black',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>);


function validationReduce(obj = {}) {
    return Object.values(obj).reduce((prev, cur) => prev && cur, true)
}

function changeReduce(obj = {}) {
    return Object.values(obj).reduce((prev, cur) => prev || cur, false)
}

function newElement(structure, preparedValue = {}) {
    const newArr = {}
    Object.keys(structure).forEach((accessor) => accessor.toUpperCase() === 'ID' ? null : newArr[accessor] = '')
    return {...newArr, ...preparedValue}
}

export default function ContractOneElement({formStructure, str, id: idElement, open, submitHandler, cancelHandler}) {
    const {formName, mainValues, tabs, bindingData} = formStructure
    const {lang} = useContext(LanguageContext);
    const classes = useStyle();

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(true);

    const [isValidArray, setIsValidArray] = useState({});
    const [isChangedArray, setIsChangedArray] = useState({});
    const [isValidElement, setIsValidElement] = useState(true);
    const [isChangedElement, setIsChangedElement] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);


    useEffect(() => {
        setIsValidElement(validationReduce(isValidArray))
    }, [isValidArray])

    useEffect(() => {
        setIsChangedElement(changeReduce(isChangedArray))
    }, [isChangedArray])

    useEffect(() => {
        if (idElement.toUpperCase() === 'ADD' || idElement === 0) {
            setLoading(false);
            return setData(newElement(str))
        }
        api.getElementHandbook(formName, +idElement)
            .then(({data}) => setData(data))
            .catch(() => console.log('error'))
            .finally(() => setLoading(false))
    }, [formName, idElement])

    //////////////////////////////////////////////////////////////
    function addElement() {
        api.addElementHandbook(formName, data)
            .then((resp) => {
                submitHandler(resp.data, data)
                cancelHandler()
            })
            .catch(() => console.log('err'))
    }

    function updateElement() {
        api.updElementHandbook(formName, data)
            .then((resp) => {
                    submitHandler(resp.data, data)
                    cancelHandler()
                }
            )
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
                setData(prev => ({...prev, [column.accessor]: value}))
            }}
            editing={editing}
            setIsValidArray={(value) => setIsValidArray(prev => ({...prev, [column.accessor]: !!value}))}
            setIsChangedArray={(value) => setIsChangedArray(prev => ({...prev, [column.accessor]: !!value}))}
        />
    }, [editing, lang, setIsValidArray])

    const parametersBlock = useCallback((parameters) => {
        return parameters.map((parameter, index) => parameter.break ?
            <Divider key={index}/> : input(parameter, data[parameter.accessor]))
    }, [input, data])

    return (
        <Dialog
            open={open}
            maxWidth={false}
            fullScreen
            className={classes.root}

            onClose={closeHandler}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <Box
                style={{height: '100vh'}}>
                <Dialog open={openDialog}>
                    <DialogTitle>Подтвердите действие</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Элемент был изменен. Выйти без сохранения.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={cancelHandler} color="primary">
                            {INTERFACE_LANGUAGE.exit[lang]}
                        </Button>
                        <Button onClick={() => setOpenDialog(false)} color="primary" autoFocus>
                            {INTERFACE_LANGUAGE.cancel[lang]}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Box className={classes.container}
                     style={{width: structureTable.maxWidth, height: '100%', display: 'flex', flexFlow: 'column'}}>
                    <Box className={classes.namePanel}>
                        <Box>
                            {idElement.toUpperCase() !== 'ADD' ?
                                <Typography variant={'subtitle1'}>
                                    {`ID: ${idElement}`}
                                </Typography>
                                : null}
                            <Typography variant={'h6'}>
                                {structureTable.header[lang]}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider/>
                    <Box>
                        {!loading && <>
                            {parametersBlock(mainValues.parameters)}
                            <AntTabs
                                style={{textTransform: 'none'}}
                                value={tabIndex}
                                onChange={(e, newVal) => setTabIndex(newVal)}
                                indicatorColor="primary"
                                variant="scrollable"
                                scrollButtons="auto">
                                {tabs.map((tab, index) => <Tab style={{textTransform: 'none'}} label={tab.name[lang]}
                                                               key={index}/>)}
                            </AntTabs>
                            {tabs.map((tab, index) => (
                                <TabPanel key={index} value={tabIndex} index={index}>
                                    {parametersBlock(tab.parameters)}
                                </TabPanel>))
                            }
                        </>}
                    </Box>
                    {editing ? <Box
                        className={classes.actionPanel}
                        style={{marginTop: 'auto'}}>
                        <Button disabled={!isValidElement}
                                size="large" color='primary'
                                onClick={actionButtonHandler}>Сохранить</Button>
                        <Button size="large" onClick={closeHandler}>Отмена</Button>
                    </Box> : null}
                </Box>
            </Box>
        </Dialog>
    )
}