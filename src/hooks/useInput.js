import {useState} from 'react';

export const useInput = ()=>{
    const [value, setValue] = useState('');
return {value, onChange:(e)=>{setValue(e.target.value)}}
}