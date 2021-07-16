import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import React, {useContext, useState} from 'react';
import {LanguageContext} from '../../App';
import {initDate} from '../../util/functions';
import InputField from '../Inputs/InputField';
import {INTERFACE_LANGUAGE} from '../../util/language';




export default function DeleteDialog({disableField=false, openDialog, deleteHandler, closeHandler}) {
    const {lang} = useContext(LanguageContext)
    const [closedDate, setClosetDate] = useState(initDate())

    return <Dialog open={openDialog}>
        <DialogTitle>Вы действительно хотите удалить?</DialogTitle>
        {disableField || <DialogContent>
                <InputField
                    type='date'
                    width='200px'
                    label="Удалить с"
                    value={closedDate}
                    onChange={setClosetDate}
                />
        </DialogContent>}
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