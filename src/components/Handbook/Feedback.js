import {Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';

export default function Feedback({openSnackbar, snackbarCloseHandler, snackbarMess, success=true}) {
    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openSnackbar}
                autoHideDuration={1000}
                onClose={snackbarCloseHandler}>
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={snackbarCloseHandler}
                    severity={success?'success':'warning'}>
                    {snackbarMess}
                </Alert>
            </Snackbar>
        </>
    )
}