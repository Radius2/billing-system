import TextField from '@material-ui/core/TextField';
import React, {useState} from 'react';

const MAX_LENGTH = 5

export default function FilterTextField({filterHandler}) {
    const [input, setInput] = useState('')
    return <TextField
        value={input}
        onChange={(e) => {
            const newValue = e.target.value.length <= MAX_LENGTH ? e.target.value : e.target.value.slice(0, MAX_LENGTH)
            if (newValue === input) return
            setInput(newValue);
            filterHandler(newValue)
        }}
        fullWidth/>
}