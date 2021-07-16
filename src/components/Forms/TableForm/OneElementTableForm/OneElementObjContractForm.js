import {Box, Button, Dialog} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import useOneElement from '../../../../hooks/useOneElement';
import useStyle from '../../../Handbook/OneElement/oneElementStyle';
import PreventActionDialog from '../../../Util/PreventActionDialog';
import {ACCESSORS, str} from '../../formStructures/objContractsStructure';
import TitleOneElement from '../TitleOneElement';
import DeleteDialog from '../../../Util/DeleteDialog';

export default function OneElementContractForm({structure, id, open, submitHandler, cancelHandler, preparedValue = {}}) {
    const {formName} = structure
    const classes = useStyle();
    const [deletedElement, setDeletedElement] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const {data, loading, closeElement, editing, isValidElement, input, closeHandler, addMode, openDialog, setOpenDialog, actionButtonHandler} = useOneElement({
        formName,
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
                deleteHandler={(value) => closeElement({ closedate: value })} />
                <Box className={classes.container}
                     style={{width: '400px', height: '100%', display: 'flex', flexFlow: 'column'}}>
                    <TitleOneElement
                        id={data.id}
                        addMode={addMode}
                        title={`Изменить`}
                        addTitle={'Добавить'}
                        closeHandler={closeHandler}
                        nameElement={''}
                        deleteElementHandler={()=>setOpenDeleteDialog(true)}
                        disableDelete={deletedElement}/>
                    {!loading && <>
                        <Box style={{display: 'flex', flexFlow: 'column', height: '100%'}}>
                            <Box>
                                {input(ACCESSORS.CONTRACT)}
                                {input(ACCESSORS.OBJECT)}
                                {input(ACCESSORS.START_DATE)}
                                {deletedElement&&input(ACCESSORS.END_DATE)}
                            </Box>
                            {editing && <Box
                                className={classes.actionPanel}
                                style={{marginTop: 'auto'}}>
                                <Button disabled={!isValidElement}
                                        size="large" color='primary'
                                        onClick={actionButtonHandler}>Сохранить</Button>
                                <Button size="large" onClick={closeHandler}>Выход</Button>
                            </Box>}
                        </Box>
                    </>}
                </Box>
            </Box>
        </Dialog>
    )
}
