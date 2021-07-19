import {TextField, MenuItem} from '@material-ui/core';
import clsx from 'clsx';
import React, {useEffect, useCallback, useRef, useState} from 'react';
import {TYPE} from '../../util/structure/handbookStructure/handbook';
import {IMaskInput} from 'react-imask'
import useStyle from './inputStyle';

const maskInputInit = {mask: /\S*/}
const maskValidationInit = false

export default function InputField({
                                       value,
                                       type,
                                       maskInput = maskInputInit,
                                       maskValidation = maskValidationInit,
                                       upperCase,
                                       editing = true,
                                       onIsValidChange = () => {
                                       },
                                       onIsChangedChange = () => {
                                       },
                                       onChange = () => {
                                       },

                                       width,
                                       label,
                                       options = null
                                   }) {
    const classes = useStyle({width});
    const {current: initValue} = useRef(value);
    const [isChanged, setIsChanged] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid((prev) => {
                if (!maskValidation) return true
                if (typeof value === 'boolean') return true;
                if (type === 'boolean') return false;
                return maskValidation?.test(value?.toString())
            }
        )
        setIsChanged(initValue !== value)
    }, [value]);

    useEffect(() => {
        onIsChangedChange(isChanged)
    }, [isChanged]);

    useEffect(() => {
        onIsValidChange(isValid)
    }, [isValid]);

    const MaskedInput = useCallback((props) => {
        return (
            <IMaskInput
                unmask
                radix="."
                lazy={false}
                {...props}
                {...maskInput}
            />
        );
    }, [maskInput])

    function valueSwitch(value) {
        switch (type) {
            default:
            case TYPE.DATE:
            case TYPE.STRING:
            case  TYPE.BOOLEAN:
                return value;
            case TYPE.NUMBER:
                return value.toString();
        }
    }

    function acceptHandler(value) {
        switch (type) {
            case TYPE.DATE:
            case TYPE.STRING:
            case  TYPE.SUB_VALUE:
                return onChange(upperCase ? value.toUpperCase() : value);
            case TYPE.NUMBER:
                return onChange(value ? +value : '');
        }
    }

    return (
        <TextField
            disabled={!editing}
            error={!isValid}
            {...type === TYPE.DATE ? {type: 'date'} : {}}
            InputLabelProps={{shrink: true}}
            className={clsx(classes.inputMui, !editing && classes.inputDisabled, editing && isChanged && isValid && classes.inputChanged,)}
            select={type === TYPE.BOOLEAN}
            label={label}
            value={valueSwitch(value)}
            {...type !== TYPE.BOOLEAN ?
                {
                    InputProps: {
                        inputProps: {onAccept: acceptHandler},
                        inputComponent: MaskedInput
                    }
                }
                : {onChange: (e) => onChange(e.target.value)}}>
            {options ? options.map((option, index) => (
                <MenuItem key={index} value={!!index}>
                    {option}
                </MenuItem>)) : null}
        </TextField>
    )
}