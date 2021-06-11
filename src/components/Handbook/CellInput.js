import {TableCell, TextField} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, {useEffect, useRef} from 'react';

const useStyle = makeStyles(theme => ({
    input: {
        fontSize: 14
    },
}))

export default function CellInput({children, showInvalid, inputHandler, isValid, focus = false}) {
    const classes = useStyle();
    const error = !isValid;
    const inputRef = useRef();
    useEffect(() => {
        if (!isValid && showInvalid) {
            console.log('showInvalid input')
            inputRef.current.focus()
        }
    }, [showInvalid, isValid])

    return (
        <TableCell>
            <TextField
                inputRef={inputRef}
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