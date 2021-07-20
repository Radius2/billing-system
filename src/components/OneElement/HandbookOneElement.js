import {
    Box,
    Button,
    Paper,
    Divider,
    Dialog,
    Typography
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HistoryIcon from '@material-ui/icons/History';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {LanguageContext} from '../../App';
import useOneElement from '../../hooks/useOneElement';
import {handbooks} from '../../structure/handbookStructure/handbook';
import {INTERFACE_LANGUAGE} from '../../util/language';
import PreventActionDialog from '../Shared/PreventActionDialog';
import Handbook from '../Handbook/Handbook';
import HistoryElement from './HistoryElement/HistoryElement';
import TooltipButton from '../Shared/TooltipButton';
import DeleteDialog from '../Shared/DeleteDialog';
import useStyle from './oneElementStyle';


export default function HandbookOneElement({open, index, submitHandler, cancelHandler, structure, id, preparedValue = {}}) {
    const {formName, columns} = structure;
    const {lang} = useContext(LanguageContext);
    const classes = useStyle();
    const [openHistory, setOpenHistory] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [str, setStr] = useState((() => {
        const newStr = {}
        structure.columns.forEach(item => newStr[item.accessor] = item)
        return newStr
    })())

    const {data,idElement, loading, closeElement, editing, isValidElement, input, closeHandler, addMode, openDialog, setOpenDialog, actionButtonHandler} = useOneElement({
        formName,
        index,
        id,
        str,
        preparedValue,
        submitHandler,
        cancelHandler
    })

    return (
        <Dialog
            open={open}
            maxWidth={false}
            fullScreen={formName === 'subjects'}
            className={classes.root}
            onClose={closeHandler}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <Box
                style={{width: structure.maxWidth}}>

                {/*окно удаления с историей*/}
                <DeleteDialog
                    openDialog={openDeleteModal}
                    deleteHandler={(closeTime) => closeElement(closeTime)}
                    closeHandler={() => setOpenDeleteModal(false)}/>

                {/*окно "вы точно хотите выйти" если изменили данные*/}
                <PreventActionDialog openDialog={openDialog}
                                     submitHandler={() => setOpenDialog(false)}
                                     cancelHandler={cancelHandler}/>

                {/*история изменений*/}
                {openHistory ?
                    <HistoryElement open={openHistory} onClose={() => setOpenHistory(false)} handbookName={formName}
                                    id={idElement}/>
                    : null
                }
                <Box component={Paper} className={classes.container}>
                    <Box className={classes.namePanel}>
                        <Box>
                            {!addMode ?
                                <Typography variant={'subtitle1'}>
                                    {`ID: ${idElement}`}
                                </Typography>
                                : null}
                            <Typography variant={'h6'}>
                                {structure.name[lang]}
                            </Typography>
                        </Box>
                        {structure.hasHistory && !addMode &&
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
                            {columns.map(column => column.mainValue && input(column.accessor, column.width))}
                            <Divider/>
                            {columns.map((column, index) => {
                                return <React.Fragment key={column.accessor + index}>
                                    {!column.mainValue && input(column.accessor, column.width)}
                                    {column.break && <br/>}
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
                {structure.bindingData && !addMode &&
                <Handbook structure={handbooks[structure.bindingData.handbookName]}
                          bindingVariant
                          preparedFilter={{
                              [structure.bindingData.filter]: idElement
                          }}
                          preparedValueForOneElement={{[structure.bindingData.preparedAccessor]: data}}/>}
            </Box>
        </Dialog>
    )
}