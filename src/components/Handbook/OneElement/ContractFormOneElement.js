import React, {useState, useEffect, useContext} from 'react';
import {Box, Button, Dialog, Typography, Toolbar, TextField} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {LanguageContext} from '../../../App';
import useOneElement from '../../../hooks/useOneElement';
import {INTERFACE_LANGUAGE} from '../../../util/language';
import Handbook from '../Handbook';
import useStyle from './oneElementStyle';
import {StyledTab, StyledTabs} from '../../StyledComponents/StyledTabs';
import DeleteDialog from '../../Shared/DeleteDialog';
import PreventActionDialog from '../../Shared/PreventActionDialog';
import {TabPanel} from '../../Shared/TabPanel';
import {ACCESSORS, str} from '../../../util/structure/formStructures/contractStructure';
import * as objContract from '../../../util/structure/formStructures/objContractsStructure';
import DividerText from '../../Shared/DividerText';
import TitleOneElement from './Components/TitleOneElement';
import {initDate} from '../../../util/functions';

export default function ContractFormOneElement({structure, id, open, submitHandler, cancelHandler, preparedValue = {}}, BindingObjects = () =>
    <div/>) {
    const {lang} = useContext(LanguageContext);
    const {formName} = structure;
    const [tabValue, setTabValue] = useState(0);
    const [deletedElement, setDeletedElement] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const classes = useStyle();
    const {data, closeElement, loading, editing, isValidElement, input, closeHandler, addMode, openDialog, setOpenDialog, actionButtonHandler} = useOneElement({
        formName,
        id,
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
                                {`Договор: `}
                                <Typography component='span' variant='subtitle1'>
                                    №
                                </Typography>
                            </>
                        }
                        addTitle={'Создание договора: '}
                        closeHandler={closeHandler}
                        nameElement={data[ACCESSORS.CONTRACT_NUMBER]}
                        deleteElementHandler={() => setOpenDeleteDialog(true)}
                        disableDelete={deletedElement}
                    />
                    <Box style={{flexGrow: 1, display: 'flex', marginTop: '8px'}}>
                        <StyledTabs orientation='vertical' variant='scrollable' value={tabValue}
                                    onChange={(e, v) => setTabValue(v)} style={{minWidth: '200px'}}>
                            <StyledTab label={'Общие данные'}/>
                            <StyledTab disabled={addMode} label={'Точки учета'}/>
                            <StyledTab disabled={addMode} label={'Дополнительно'}/>
                        </StyledTabs>

                        {!loading && (
                            <>
                                <TabPanel value={tabValue} index={0}>
                                    <Box style={{
                                        marginLeft: '16px',
                                        display: 'flex',
                                        flexFlow: 'column',
                                        height: '100%'
                                    }}>
                                        <Box>
                                            <DividerText text={'Основные данные'}/>
                                            {input(ACCESSORS.CONTRACT_NUMBER)}
                                            {!addMode && <br/>}
                                            {input(ACCESSORS.START_DATE)}
                                            {addMode || input(ACCESSORS.END_DATE)}
                                            <br/>
                                            {input(ACCESSORS.CUSTOMER)}
                                            {input(ACCESSORS.CONSIGNEE)}
                                            <DividerText text={'Данные договора'}/>
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
                                                    Сохранить
                                                </Button>
                                                <Button size='large' onClick={closeHandler}>
                                                    Выход
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                </TabPanel>
                                <TabPanel value={tabValue} index={1}>
                                    <Box style={{
                                        marginLeft: '16px',
                                        display: 'flex',
                                        flexFlow: 'column',
                                        height: '100%'
                                    }}
                                    >
                                        <Toolbar style={{padding: '0', justifyContent: 'space-between'}}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<AddIcon/>}
                                            >
                                                {INTERFACE_LANGUAGE.add[lang]}
                                            </Button>
                                            <TextField
                                                value={initDate()}
                                                label={'Показывать актуальные на'}
                                                type='date'
                                            />
                                        </Toolbar>
                                        <Handbook
                                            structure={objContract.structureTableForContracts}
                                            preparedFilter={{
                                                accessor: 'contractnumber',
                                                id: data.contractnumber,
                                                //preparedValue: { contract: data },
                                            }}
                                            disableToolbar
                                            bindingVariant
                                        />
                                    </Box>
                                </TabPanel>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
