import {TableCell, TextField} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, {useEffect, useState} from 'react';

const useStyle = makeStyles(theme => ({
    input: {
        fontSize: 14
    },
}))

export default function CellInput({children, blurHandler, focus}) {
    const [textField, setTextField] = useState(children);
    const classes = useStyle();
    useEffect(() => {
        setTextField(children || '')
    }, [children])
    return (
        <TableCell>
            <TextField
                fullWidth
                size='small'
                autoFocus={focus}
                value={textField}
                inputProps={{className: classes.input}}
                onChange={e => setTextField(prev => e.target.value)}
                onBlur={(e) => blurHandler(e.target.value)}/>
        </TableCell>
    )
}