import {TextField, MenuItem} from '@material-ui/core';
import clsx from 'clsx';
import React, {useEffect, useCallback, useRef, useState} from 'react';
import {TYPE} from '../../../util/handbook';
import {IMaskInput} from 'react-imask'
import useStyle from './oneElementStyle';

const maskInputInit = {mask:/\S*/}
const maskValidationInit = /\S*/

export default function InputField({maskInput=maskInputInit, maskValidation=maskValidationInit, editing, setIsValidArray, setIsChangedArray, width, value, label, inputHandler, type, options = null}) {
    const classes = useStyle({width});
    const {current: initValue} = useRef(value);
    const [isChanged, setIsChanged] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        setIsValid((prev) => {
                if (!maskValidation) return true
                if (typeof value === 'boolean') return true;
                if (type === 'boolean') return false;
                if ( typeof value !== 'string') return false;
                return maskValidation?.test(value)
            }
        )
        setIsChanged(initValue !== value)
    }, [value]);

    useEffect(() => {
        setIsChangedArray(isChanged)
    }, [isChanged]);

    useEffect(() => {
        setIsValidArray(isValid)
    }, [isValid]);

    const MaskedInput=useCallback((props)=>{
        return (
            <IMaskInput
                unmask
                radix="."
                lazy={false}
                {...props}
                {...maskInput}
            />
        );
    },[maskInput])


    return (
        <TextField
            disabled={!editing}
            error={!isValid}
            InputLabelProps={{shrink: true}}
            className={clsx(classes.inputMui, !editing && classes.inputDisabled, isChanged && isValid && classes.inputChanged,)}
            select={type === TYPE.BOOLEAN}
            label={label}
            value={value}
            onFocus={() => setIsTouched(true)}
            {...type!==TYPE.BOOLEAN?
                {InputProps : {
                inputProps: {onAccept:(value)=> inputHandler(value)},
                inputComponent: MaskedInput
            }}
            :{onChange:(e)=>inputHandler(e.target.value)}}>
            {options ? options.map((option, index) => (
                <MenuItem key={index} value={!!index}>
                    {option}
                </MenuItem>)) : null}
        </TextField>
    )
}