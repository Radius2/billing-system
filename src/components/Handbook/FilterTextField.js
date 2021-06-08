import TextField from '@material-ui/core/TextField';
import React, {useState} from 'react';

export default function FilterTextField({filterHandler}) {
    const [input, setInput] = useState('')
    return <TextField
        value={input}
        onChange={(e) => {
            setInput(e.target.value);
            filterHandler(e.target.value)
        }}
        fullWidth/>
}