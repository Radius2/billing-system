import {TableCell, TextField, MenuItem} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, {useEffect, useRef} from 'react';
import {TYPE} from '../../util/handbook';

const useStyle = makeStyles(theme => ({
    input: {
        fontSize: 14
    },
}))

export default function CellInput({children, showInvalid, inputHandler, isValid, type, options = null, focus = false}) {
    const classes = useStyle();
    const error = !isValid;
    const inputRef = useRef();
    useEffect(() => {
        if (!isValid && showInvalid) {
            inputRef.current.focus()
        }
    }, [showInvalid, isValid])

    const dateProps = type === TYPE.DATE ? {type: 'date', format: 'dd/MM/YYYY'} : {multiline: true, rowsMax: 4}

    return (
        <TableCell>
            <TextField
                inputRef={inputRef}
                select={type === TYPE.BOOLEAN}
                {...dateProps}
                fullWidth
                size='small'
                error={error}
                autoFocus={focus}
                value={children}
                inputProps={{className: classes.input}}
                onChange={(e) => inputHandler(e.target.value)}>
                {options ? options.map((option, index) => (
                    <MenuItem key={index} value={!!index}>
                        {option}
                    </MenuItem>)) : null}
            </TextField>
        </TableCell>
    )
}