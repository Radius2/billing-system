import {useState} from 'react';

export const useInput = (init) => {
    const [value, setValue] = useState(init || '');
    return {
        value, onChange: (e) => {
            setValue(e.target.value)
        }
    }
}