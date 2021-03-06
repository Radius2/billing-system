import {Box, Button, Dialog} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import useOneElement from '../../hooks/useOneElement';
import useStyle from './oneElementStyle';
import InputField from '../Inputs/InputField';
import PreventActionDialog from '../Shared/PreventActionDialog';
import {ACCESSORS, str, FORM_NAME as formName} from '../../structure/formStructures/objContractsStructure';
import DividerText from '../Shared/DividerText';
import TitleOneElement from './Components/TitleOneElement';
import DeleteDialog from '../Shared/DeleteDialog';

export default function ObjContractFormOneElement({index, id, open, submitHandler, cancelHandler, preparedValue = {}}) {
    const classes = useStyle();
    const [deletedElement, setDeletedElement] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const {data, loading, closeElement, editing, isValidElement, input, closeHandler, addMode, openDialog, setOpenDialog, actionButtonHandler} = useOneElement({
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
                    deleteHandler={(value) => closeElement({closedate: value})}/>
                <Box className={classes.container}
                     style={{width: 350 * 2 + 16 * 4 + 'px', height: '100%', display: 'flex', flexFlow: 'column'}}>
                    <TitleOneElement
                        id={data.id}
                        addMode={addMode}
                        title={`????????????????`}
                        addTitle={'????????????????'}
                        closeHandler={closeHandler}
                        nameElement={''}
                        deleteElementHandler={() => setOpenDeleteDialog(true)}
                        disableDelete={deletedElement}/>
                    {!loading && <>
                        <Box style={{display: 'flex', flexFlow: 'column', height: '100%'}}>
                            <Box>
                                {input(ACCESSORS.START_DATE)}
                                {deletedElement && input(ACCESSORS.END_DATE)}
                                <DividerText text={'???????????? ????????????????'}/>
                                {input(ACCESSORS.CONTRACT)}<br/>
                                {data.contract.id && <><InputField
                                    value={data.contract.startdate}
                                    type='date'
                                    editing={false}
                                    label={'???????? ????????????'}
                                    width={'350px'}
                                />
                                    <InputField
                                        value={data.contract.enddate}
                                        type='date'
                                        editing={false}
                                        label={'???????? ??????????????????'}
                                        width={'350px'}
                                    />
                                    {input(ACCESSORS.CONTRACT_SUBJECT)}</>}
                                <DividerText text={'???????????? ?????????? ??????????????????????'}/>
                                {input(ACCESSORS.OBJECT)}<br/>
                                {data.object.id && <>{input(ACCESSORS.OBJECT_REGQTY)}
                                    <InputField
                                        value={data.object?.tariffgroup?.tariffgroupname}
                                        editing={false}
                                        label={'???????????? ??????????????'}
                                        width={'350px'}
                                    /><br/>
                                    <InputField
                                        value={data.object?.house?.street?.city?.cityname}
                                        editing={false}
                                        label={'??????????'}
                                        width={'350px'}
                                    />
                                    <InputField
                                        value={data.object?.house?.street?.streetname}
                                        editing={false}
                                        label={'??????????'}
                                        width={'350px'}
                                    />
                                    <InputField
                                        value={data.object?.house?.housenumber}
                                        editing={false}
                                        label={'?????????? ????????'}
                                        width={'350px'}
                                    />
                                    <InputField
                                        value={data.object?.flatnumber}
                                        editing={false}
                                        label={'?????????? ????????????????'}
                                        width={'350px'}
                                    />
                                </>}
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
