import {Box, Button, Dialog} from '@material-ui/core';
import React, {useState, useEffect, useContext} from 'react';
import {LanguageContext} from '../../App';
import useOneElement from '../../hooks/useOneElement';
import {INTERFACE_LANGUAGE} from '../../util/language';
import useStyle from './oneElementStyle';
import PreventActionDialog from '../Shared/PreventActionDialog';
import {ACCESSORS, str, FORM_NAME as formName} from '../../structure/formStructures/puStructure';
import TitleOneElement from './Components/TitleOneElement';
import DeleteDialog from '../Shared/DeleteDialog';

export default function PuFormOneElement({index, id, open, submitHandler, cancelHandler, preparedValue = {}}) {
    const classes = useStyle();
    const {lang}= useContext(LanguageContext);
    const [deletedElement, setDeletedElement] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const {data, loading, deleteElement, editing, isValidElement, input, closeHandler, addMode, openDialog, setOpenDialog, actionButtonHandler} = useOneElement({
        formName,
        id,
        index,
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
                        title={`????????????: `}
                        addTitle={'?????????????? ????????????: '}
                        closeHandler={closeHandler}
                        nameElement={data.id}
                        deleteElementHandler={() => setOpenDeleteDialog(true)}
                        disableDelete={deletedElement}/>
                    {!loading && <>
                        <Box style={{display: 'flex', flexFlow: 'column', height: '100%'}}>
                            <Box>
                                {input(ACCESSORS.START_DATE)}
                                {addMode || input(ACCESSORS.END_DATE)}
                            </Box>
                            {editing ? <Box
                                className={classes.actionPanel}
                                style={{marginTop: 'auto'}}>
                                <Button disabled={!isValidElement}
                                        size="large" color='primary'
                                        onClick={actionButtonHandler}>{INTERFACE_LANGUAGE.save[lang]}</Button>
                                <Button size="large" onClick={closeHandler}>{INTERFACE_LANGUAGE.exit[lang]}</Button>
                            </Box> : null}
                        </Box>
                    </>}
                </Box>
            </Box>
        </Dialog>
    )
}
