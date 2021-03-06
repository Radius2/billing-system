import React, {useState, useEffect, useContext} from 'react';
import {Box, Dialog} from '@material-ui/core';
import {LanguageContext} from '../../App';
import useOneElement from '../../hooks/useOneElement';
import {handbooks} from '../../structure/handbookStructure/handbook';
import HistoryElement from './HistoryElement/HistoryElement';
import useStyle from './oneElementStyle';
import {StyledTab, StyledTabs} from '../StyledComponents/StyledTabs';
import DeleteDialog from '../Shared/DeleteDialog';
import PreventActionDialog from '../Shared/PreventActionDialog';
import {ACCESSORS, str, FORM_NAME as formName} from '../../structure/formStructures/subjectStructure';
import DividerText from '../Shared/DividerText';
import TitleOneElement from './Components/TitleOneElement';
import TabPanelForm from './Components/TabPanelForm';
import BindingHandbookInForm from './Components/BindingHandbookInForm';
import * as contracts from '../../structure/formStructures/contractStructure'
import ButtonPanel from './Components/ButtonPanel';

export default function SubjectFormOneElement({index, id, open, submitHandler, cancelHandler, preparedValue = {}},) {
    const {lang} = useContext(LanguageContext);
    const [tabValue, setTabValue] = useState(0);
    const [deletedElement, setDeletedElement] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const classes = useStyle();
    const {data, closeElement, loading, editing, isValidElement, input, closeHandler, addMode, openDialog, setOpenDialog, actionButtonHandler} = useOneElement({
        formName,
        id,
        index,
        str,
        preparedValue,
        submitHandler,
        cancelHandler,
    });

    useEffect(() => {
        setDeletedElement(!!data[ACCESSORS.END_DATE]);
    }, [data]);

    return (
        <Dialog
            open={open}
            maxWidth={false}
            fullScreen
            className={classes.root}
            onClose={closeHandler}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'>
            <Box style={{height: '100vh'}}>
                <PreventActionDialog openDialog={openDialog} submitHandler={() => setOpenDialog(false)}
                                     cancelHandler={cancelHandler}/>
                <DeleteDialog
                    openDialog={openDeleteDialog}
                    closeHandler={() => setOpenDeleteDialog(false)}
                    deleteHandler={value => closeElement({subclose: value})}
                />
                <Box className={classes.container}
                     style={{width: '1000px', height: '100%', display: 'flex', flexFlow: 'column'}}>
                    <TitleOneElement
                        id={data.id}
                        addMode={addMode}
                        title={`??????????????: `}
                        addTitle={'???????????????? ????????????????: '}
                        closeHandler={closeHandler}
                        nameElement={data[ACCESSORS.SUB_NAME]}
                        deleteElementHandler={() => setOpenDeleteDialog(true)}
                        disableDelete={deletedElement}
                    />
                    <Box style={{flexGrow: 1, display: 'flex', marginTop: '8px'}}>
                        <StyledTabs orientation='vertical' variant='scrollable' value={tabValue}
                                    onChange={(e, v) => setTabValue(v)} style={{minWidth: '200px'}}>
                            <StyledTab label={'????????????'}/>
                            <StyledTab disabled={addMode} label={'??????????'}/>
                            <StyledTab disabled={addMode} label={'???????????????? ????????????????'}/>
                            <StyledTab disabled={addMode} label={'?????????????? ??????????????????'}/>
                        </StyledTabs>

                        {!loading && (
                            <>
                                <TabPanelForm index={0} value={tabValue}>
                                    <Box>
                                        <DividerText text={'???????????????? ????????????'}/>
                                        {input(ACCESSORS.ID)}
                                        {input(ACCESSORS.SUB_ACC_NUMBER)}
                                        {input(ACCESSORS.SUB_NAME)}
                                        {input(ACCESSORS.SUB_BIN)}
                                        {input(ACCESSORS.SUB_START)}
                                        {input(ACCESSORS.SUB_HEAD_NAME)}
                                        {input(ACCESSORS.SUB_HEAD_POS)}
                                        {input(ACCESSORS.SUB_ACC_NAME)}
                                        {input(ACCESSORS.SUB_ACC_POS)}
                                        {input(ACCESSORS.SUB_PHYS)}
                                        {input(ACCESSORS.SUB_TYPE)}
                                        <DividerText text={'???????????????????????????? ????????????'}/>
                                        {input(ACCESSORS.SUB_ADDR)}
                                        {input(ACCESSORS.SUB_PHONE)}
                                        {input(ACCESSORS.SUB_DESCR, '100%')}

                                    </Box>
                                    {editing && (
                                        <ButtonPanel
                                            disableActionButton={!isValidElement}
                                            actionButtonHandler={actionButtonHandler}
                                            closeButtonHandler={closeHandler}/>
                                    )}
                                </TabPanelForm>
                                <TabPanelForm value={tabValue} index={1}>
                                    <BindingHandbookInForm
                                        preparedFilter={{
                                            subid: data.id,
                                        }}
                                        preparedValue={{subj: data}}
                                        structure={handbooks.sub_banks}/>
                                </TabPanelForm>

                                <TabPanelForm value={tabValue} index={2}>
                                    <BindingHandbookInForm
                                        preparedFilter={{
                                            custid: data.id,
                                        }}
                                        preparedValue={{'consignee': data, 'customer': data}}
                                        structure={contracts.structureTableForSubjects}/>
                                </TabPanelForm>

                                <TabPanelForm value={tabValue} index={3}>
                                    <HistoryElement
                                        id={data.id}
                                        handbookName={formName}
                                    />
                                </TabPanelForm>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
