import {Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';

export default function Feedback({openSnackbar, snackbarCloseHandler, snackbarMess, success = true}) {
    return openSnackbar ?
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={snackbarCloseHandler}>
            <Alert
                elevation={6}
                variant="filled"
                onClose={snackbarCloseHandler}
                severity={success ? 'success' : 'warning'}>
                {openSnackbar ? snackbarMess : null}
            </Alert>
        </Snackbar> : null
}