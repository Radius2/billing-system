import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import React, {useContext} from 'react';
import {LanguageContext} from '../../App';
import {INTERFACE_LANGUAGE} from '../../util/language';

export default function PreventActionDialog({openDialog, cancelHandler, submitHandler}) {
    const {lang} = useContext(LanguageContext)
    return <Dialog open={openDialog}>
        <DialogTitle>Подтвердите действие</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Элемент был изменен. Выйти без сохранения.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={cancelHandler} color="primary">
                {INTERFACE_LANGUAGE.exit[lang]}
            </Button>
            <Button onClick={submitHandler} color="primary" autoFocus>
                {INTERFACE_LANGUAGE.cancel[lang]}
            </Button>
        </DialogActions>
    </Dialog>
}