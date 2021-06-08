import {TableCell, TextField} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

const useStyle = makeStyles(theme => ({
    input: {
        fontSize: 14
    },
}))

export default function CellInput({children, inputHandler, isValid, focus=false}) {
    const classes = useStyle();
    const error = !isValid;

    return (
        <TableCell>
            <TextField
                fullWidth
                size='small'
                error={error}
                multiline
                autoFocus={focus}
                rowsMax={4}
                value={children}
                inputProps={{className: classes.input}}
                onChange={(e) => inputHandler(e.target.value)}/>
        </TableCell>
    )
}