import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import React, {useContext, useState} from 'react';
import {LanguageContext} from '../../../App';
import {initDate} from '../../../util/functions';
import InputField from '../../Inputs/InputField';
import {INTERFACE_LANGUAGE} from '../../../util/language';




export default function DeleteDialog({openDialog, deleteHandler, closeHandler}) {
    const {lang} = useContext(LanguageContext)
    const [closedDate, setClosetDate] = useState(initDate())

    return <Dialog open={openDialog}>
        <DialogTitle>Вы действительно хотите удалить?</DialogTitle>
        <DialogContent>
            <DialogContentText>
                <InputField
                    type='date'
                    width='150px'
                    label="Удалить с"
                    value={closedDate}
                    onChange={setClosetDate}
                />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>deleteHandler(closedDate)} color="secondary">
                {INTERFACE_LANGUAGE.delete[lang]}
            </Button>
            <Button onClick={closeHandler} color="primary" autoFocus>
                {INTERFACE_LANGUAGE.cancel[lang]}
            </Button>
        </DialogActions>
    </Dialog>
}