import {Box, Button, Dialog} from '@material-ui/core';
import React, {useState} from 'react';
import useOneElement from '../../hooks/useOneElement';
import InputField from '../Inputs/InputField';
import {StyledTab, StyledTabs} from '../StyledComponents/StyledTabs';
import TabPanelForm from './Components/TabPanelForm';
import useStyle from './oneElementStyle';
import PreventActionDialog from '../Shared/PreventActionDialog';
import {ACCESSORS, str} from '../../structure/formStructures/actStructure';
import TitleOneElement from './Components/TitleOneElement';
import DeleteDialog from '../Shared/DeleteDialog';

export default function OneElementContractForm({structure, index, id, open, submitHandler, cancelHandler, preparedValue = {}}) {
    const {formName} = structure;
    const classes = useStyle();
    const [tabValue, setTabValue] = useState(0);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const {data, loading, deleteElement, editing, isValidElement, input, closeHandler, addMode, openDialog, setOpenDialog, actionButtonHandler} = useOneElement(
        {
            formName,
            id,
            index,
            str,
            preparedValue,
            submitHandler,
            cancelHandler,
        }
    );

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
                <DeleteDialog openDialog={openDeleteDialog} closeHandler={() => setOpenDeleteDialog(false)}
                              deleteHandler={deleteElement} disableField/>
                <Box className={classes.container}
                     style={{width: 1000+'px', height: '100%', display: 'flex', flexFlow: 'column'}}>
                    <TitleOneElement
                        id={data.id}
                        addMode={addMode}
                        title={`Акт: `}
                        addTitle={'Создание акта: '}
                        closeHandler={closeHandler}
                        nameElement={data.actnumber}
                        deleteElementHandler={() => setOpenDeleteDialog(true)}
                    />
                    <Box style={{flexGrow: 1, display: 'flex', marginTop: '8px'}}>
                        <StyledTabs orientation='vertical' variant='scrollable' value={tabValue}
                                    onChange={(e, v) => setTabValue(v)} style={{minWidth: '200px'}}>
                            <StyledTab label={'Основные данные'}/>
                            <StyledTab disabled={addMode} label={'Детали'}/>
                        </StyledTabs>
                        {!loading && (
                            <TabPanelForm index={0} value={tabValue}>
                                <Box style={{display: 'flex', flexFlow: 'column', height: '100%'}}>
                                    <Box>
                                        {input(ACCESSORS.ACT_DATE)}
                                        {input(ACCESSORS.ACT_NUMBER)}
                                        {input(ACCESSORS.ACT_TYPE)}<br/>
                                        {input(ACCESSORS.OBJECT)}<br/>
                                        {data.object.id && <>
                                            <InputField
                                                value={data.object?.regqty?.toString()}
                                                editing={false}
                                                label={'Количество зарегистирированных'}
                                                width={'350px'}
                                            />
                                            <InputField
                                                value={data.object?.tariffgroup?.tariffgroupname}
                                                editing={false}
                                                label={'Группа тарифов'}
                                                width={'350px'}
                                            /><br/>
                                            <InputField
                                                value={data.object?.house?.street?.city?.cityname}
                                                editing={false}
                                                label={'Город'}
                                                width={'350px'}
                                            />
                                            <InputField
                                                value={data.object?.house?.street?.streetname}
                                                editing={false}
                                                label={'Улица'}
                                                width={'350px'}
                                            />
                                            <InputField
                                                value={data.object?.house?.housenumber}
                                                editing={false}
                                                label={'Номер дома'}
                                                width={'350px'}
                                            />
                                            <InputField
                                                value={data.object?.flatnumber}
                                                editing={false}
                                                label={'Номер квартиры'}
                                                width={'350px'}
                                            />
                                        </>}
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
                            </TabPanelForm>
                        )}
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
