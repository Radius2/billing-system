import {Box, Button, Dialog} from '@material-ui/core';
import React, {useState} from 'react';
import useOneElement from '../../hooks/useOneElement';
import * as objContract from '../../structure/formStructures/objContractsStructure';
import BindingHandbookInForm from './Components/BindingHandbookInForm';
import TabPanelForm from './Components/TabPanelForm';
import useStyle from './oneElementStyle';
import HouseSelect from '../Inputs/HouseSelect';
import {StyledTab, StyledTabs} from '../StyledComponents/StyledTabs';
import PreventActionDialog from '../Shared/PreventActionDialog';
import {TabPanel} from '../Shared/TabPanel';
import {ACCESSORS, str} from '../../structure/formStructures/objectStructure';
import DividerText from '../Shared/DividerText';
import TitleOneElement from './Components/TitleOneElement';
import DeleteDialog from '../Shared/DeleteDialog';
import * as acts from '../../structure/formStructures/actStructure';

export default function ObjectFormOneElement({structure, index, id, open, submitHandler, cancelHandler, preparedValue = {}}) {
    const {formName} = structure;
    const classes = useStyle();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const {data, setData, deleteElement, loading, editing, isValidElement, input, closeHandler, addMode, openDialog, setOpenDialog, actionButtonHandler} =
        useOneElement({
            formName,
            id,
            index,
            str,
            preparedValue,
            submitHandler,
            cancelHandler,
        });

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
                <DeleteDialog openDialog={openDeleteDialog} disableField closeHandler={() => setOpenDeleteDialog(false)}
                              deleteHandler={deleteElement}/>
                <Box className={classes.container}
                     style={{width: '1000px', height: '100%', display: 'flex', flexFlow: 'column'}}>
                    <TitleOneElement
                        id={data.id}
                        addMode={addMode}
                        title={'Точка учета: '}
                        addTitle={'Создание точки учета: '}
                        closeHandler={closeHandler}
                        deleteElementHandler={() => setOpenDeleteDialog(true)}
                        nameElement={data[ACCESSORS.OBJECT_NAME]}
                    />

                    <Box style={{flexGrow: 1, display: 'flex', marginTop: '8px'}}>
                        <StyledTabs orientation='vertical' variant='scrollable' value={tabValue}
                                    onChange={(e, v) => setTabValue(v)} style={{minWidth: '200px'}}>
                            <StyledTab label={'Общие данные'}/>
                            <StyledTab disabled={addMode} label={'Акты нарушений'}/>
                            <StyledTab disabled={addMode} label={'Договоры по точке'}/>
                            <StyledTab disabled={addMode} label={'Приборы учета'}/>
                            <StyledTab disabled={addMode} label={'Показания'}/>
                            <StyledTab disabled={addMode} label={'Еще какие-то данные'}/>
                            <StyledTab disabled={addMode} label={'И еще какие-то данные'}/>
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
                                            {input(ACCESSORS.OBJECT_NAME)}
                                            {input(ACCESSORS.REG_QTY)}
                                            <br/>
                                            {input(ACCESSORS.OBJECT_TYPE)}
                                            {input(ACCESSORS.TARIFF_GROUP)}
                                            {input(ACCESSORS.UZO)}
                                            <DividerText text={'Адрес'}/>
                                            <HouseSelect
                                                initHouse={data[ACCESSORS.HOUSE]}
                                                onHouseChange={house =>
                                                    setData(prev => ({
                                                        ...prev,
                                                        [ACCESSORS.HOUSE]: house,
                                                    }))
                                                }
                                            />
                                            {input(ACCESSORS.FLAT_NUMBER)}
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

                                <TabPanelForm value={tabValue} index={1}>
                                    <BindingHandbookInForm
                                        preparedFilter={{
                                            objectid: data.id,
                                        }}
                                        preparedValue={{object: data}}
                                        structure={acts.structureTableForObjects}/>
                                </TabPanelForm>

                                <TabPanelForm value={tabValue} index={2}>
                                    <BindingHandbookInForm
                                        preparedFilter={{
                                            objectname: data.objectname,
                                        }}
                                        preparedValue={{object: data}}
                                        structure={objContract.structureTableForObjects}/>
                                </TabPanelForm>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
