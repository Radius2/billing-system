import React, {useState, useEffect} from 'react';
import {Box, Button, Dialog, Typography} from '@material-ui/core';
import useOneElement from '../../hooks/useOneElement';
import ObjectFormOneElement from './ObjectFormOneElement';
import useStyle from './oneElementStyle';
import {StyledTab, StyledTabs} from '../StyledComponents/StyledTabs';
import DeleteDialog from '../Shared/DeleteDialog';
import PreventActionDialog from '../Shared/PreventActionDialog';
import {ACCESSORS, str, FORM_NAME as formName} from '../../structure/formStructures/contractStructure';
import * as objContract from '../../structure/formStructures/objContractsStructure';
import DividerText from '../Shared/DividerText';
import TitleOneElement from './Components/TitleOneElement';
import TabPanelForm from './Components/TabPanelForm';
import BindingHandbookInForm from './Components/BindingHandbookInForm';

export default function ContractFormOneElement({index, id, open, submitHandler, cancelHandler, preparedValue = {}}) {
    const [tabValue, setTabValue] = useState(0);
    const [deletedElement, setDeletedElement] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openModalOneElement, setOpenModalOneElement] = useState(false)
    const [idModalOneElement, setIdModalOneElement] = useState(false)
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
                    deleteHandler={value => closeElement({closedate: value})}
                />
                <Box className={classes.container}
                     style={{width: '1000px', height: '100%', display: 'flex', flexFlow: 'column'}}>
                    <TitleOneElement
                        id={data.id}
                        addMode={addMode}
                        title={
                            <>
                                {`??????????????: `}
                                <Typography component='span' variant='subtitle1'>
                                    ???
                                </Typography>
                            </>
                        }
                        addTitle={'???????????????? ????????????????: '}
                        closeHandler={closeHandler}
                        nameElement={data[ACCESSORS.CONTRACT_NUMBER]}
                        deleteElementHandler={() => setOpenDeleteDialog(true)}
                        disableDelete={deletedElement}
                    />
                    <Box style={{flexGrow: 1, display: 'flex', marginTop: '8px'}}>
                        <StyledTabs orientation='vertical' variant='scrollable' value={tabValue}
                                    onChange={(e, v) => setTabValue(v)} style={{minWidth: '200px'}}>
                            <StyledTab label={'?????????? ????????????'}/>
                            <StyledTab disabled={addMode} label={'?????????? ??????????'}/>
                            <StyledTab disabled={addMode} label={'??????????????????????????'}/>
                        </StyledTabs>

                        {!loading && (
                            <>
                                <TabPanelForm index={0} value={tabValue}>
                                    <Box>
                                        <DividerText text={'???????????????? ????????????'}/>
                                        {input(ACCESSORS.CONTRACT_NUMBER)}
                                        {!addMode && <br/>}
                                        {input(ACCESSORS.START_DATE)}
                                        {addMode || input(ACCESSORS.END_DATE)}
                                        <br/>
                                        {input(ACCESSORS.CUSTOMER)}
                                        {input(ACCESSORS.CONSIGNEE)}
                                        <DividerText text={'???????????? ????????????????'}/>
                                        {input(ACCESSORS.ESO)}
                                        {input(ACCESSORS.ESO_CONTRACT_NUMBER)}
                                        <br/>
                                        {input(ACCESSORS.AREA)}
                                        {input(ACCESSORS.CUSTOMER_GROUP)}
                                        <br/>
                                        {input(ACCESSORS.PERSONAL_ACCOUNT)}
                                    </Box>
                                    {editing && (
                                        <Box className={classes.actionPanel} style={{marginTop: 'auto'}}>
                                            <Button disabled={!isValidElement} size='large' color='primary'
                                                    onClick={actionButtonHandler}>
                                                ??????????????????
                                            </Button>
                                            <Button size='large' onClick={closeHandler}>
                                                ??????????
                                            </Button>
                                        </Box>
                                    )}
                                </TabPanelForm>
                                <TabPanelForm value={tabValue} index={1}>
                                    <BindingHandbookInForm
                                        preparedFilter={{
                                            contractnumber: data.contractnumber,
                                        }}
                                        preparedValue={{contract: data}}
                                        structure={objContract.structureTableForContracts}
                                        clickRowHandler={value => {
                                            setOpenModalOneElement(true);
                                            setIdModalOneElement(value.object.id)
                                        }}
                                    />
                                    {openModalOneElement &&
                                    <ObjectFormOneElement
                                        open={openModalOneElement}
                                        id={idModalOneElement.toString()}
                                        cancelHandler={() => setOpenModalOneElement(false)}
                                    />
                                    }
                                </TabPanelForm>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
