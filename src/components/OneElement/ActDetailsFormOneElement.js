import {Box, Button, Dialog} from '@material-ui/core';
import React, {useState, useEffect, useContext} from 'react';
import {LanguageContext} from '../../App';
import useOneElement from '../../hooks/useOneElement';
import AsyncInputSelect from '../Inputs/AsyncInputSelect';
import useStyle from './oneElementStyle';
import PreventActionDialog from '../Shared/PreventActionDialog';
import {ACCESSORS, str, FORM_NAME as formName} from '../../structure/formStructures/actDetailStructure';
import TitleOneElement from './Components/TitleOneElement';
import DeleteDialog from '../Shared/DeleteDialog';

export default function ActDetailsFormOneElement({index, id, open, submitHandler, cancelHandler, preparedValue = {}}) {
    const {lang} = useContext(LanguageContext)
    const classes = useStyle();
    const [deletedElement, setDeletedElement] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const {data, setData, loading, deleteElement, editing, isValidElement, input, closeHandler, addMode, openDialog, setOpenDialog, actionButtonHandler} = useOneElement({
        formName,
        index,
        id,
        str,
        preparedValue,
        submitHandler,
        cancelHandler
    })

    useEffect(() => {
        setDeletedElement(!!data[ACCESSORS.END_DATE])
    }, [data])

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
                <PreventActionDialog openDialog={openDialog}
                                     submitHandler={() => setOpenDialog(false)}
                                     cancelHandler={cancelHandler}/>
                <DeleteDialog
                    openDialog={openDeleteDialog}
                    closeHandler={() => setOpenDeleteDialog(false)}
                    deleteHandler={deleteElement}/>
                <Box className={classes.container}
                     style={{width: 350 * 2 + 16 * 4 + 'px', height: '100%', display: 'flex', flexFlow: 'column'}}>
                    <TitleOneElement
                        id={data.id}
                        addMode={addMode}
                        title={`???????????? ?? ????????: `}
                        addTitle={'?????????????? ???????????? ?? ????????: '}
                        closeHandler={closeHandler}
                        nameElement={data?.[ACCESSORS.ACT]?.actnumber}
                        deleteElementHandler={() => setOpenDeleteDialog(true)}
                        disableDelete={deletedElement}/>
                    {!loading && <>
                        <Box style={{display: 'flex', flexFlow: 'column', height: '100%'}}>
                            <Box>
                                {input(ACCESSORS.INITIAL_VALUES)}

                                {input(ACCESSORS.INSTALL_DATE)}
                                <AsyncInputSelect
                                    subPath={str[ACCESSORS.PU].subPath}
                                    value={data.pu}
                                    onChange={val => setData(prev => ({...prev, pu: val}))}
                                    editing={true}
                                    label={str[ACCESSORS.PU].header[lang]}
                                    width='350px'
                                    filterParams={{objectname: data?.act?.object?.objectname}}
                                    externalValue={{object: data?.act?.object}}
                                />

                                {input(ACCESSORS.PU_TYPE)}
                                {input(ACCESSORS.PU_NUMBER)}

                                {input(ACCESSORS.SEAL_NUMBER)}
                                {input(ACCESSORS.CHECK_INTERVAL)}
                            </Box>
                            {editing && <Box
                                className={classes.actionPanel}
                                style={{marginTop: 'auto'}}>
                                <Button disabled={!isValidElement}
                                        size="large" color='primary'
                                        onClick={actionButtonHandler}>??????????????????</Button>
                                <Button size="large" onClick={closeHandler}>??????????</Button>
                            </Box>}
                        </Box>
                    </>}
                </Box>
            </Box>
        </Dialog>
    )
}
