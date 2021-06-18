import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDown from '@material-ui/icons/ArrowDropDown';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as api from '../../api/api'
import {TextField, Box, MenuItem} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, {useCallback, useEffect, useRef, useState} from 'react';

const useStyle = makeStyles(theme => ({
    input: {
        fontSize: 14
    },
}))

export default function AsyncInputSelect({startValue, showInvalid, subPath, selectHandler, isValid, focus = false}) {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(startValue ?? {})//внутреннее значение
    const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = useState([])
    const classes = useStyle();
    const error = !isValid;
    const inputRef = useRef();

    const getOptions = useCallback(() => {
        api.getHandbook(subPath.path,
            {
                [subPath.accessor]: '%' + inputValue,
                page_size: 7
            })
            .then(({data}) => {
                setOptions(data.values)
            })
            .catch(() => console.log('err'))
            .finally(() => setLoading(false))
    }, [inputValue])

    useEffect(() => {
            if (!isOpen) return undefined
            setLoading(true)
            const timer = setTimeout(() => {
                getOptions();
            }, 500);
            return () => {
                setLoading(false);
                clearTimeout(timer);
            }
        }, [inputValue, isOpen]
    )

    // фокус на невалид
    useEffect(() => {
        if (!isValid && showInvalid) {
            inputRef.current.focus()
        }
    }, [showInvalid, isValid])

    function closeHandler() {
        setIsOpen(false)
        setOptions([])
    }

    return (
        <Autocomplete
            options={options}
            value={value}
            inputValue={inputValue}
            noOptionsText='пусто'
            disableClearable
            getOptionSelected={(option, value) => option.id === value.id}
            onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
            onChange={(e, newValue) => {
                setValue(newValue)
                selectHandler(newValue)
            }}
            onOpen={() => setIsOpen(true)}
            onClose={closeHandler}
            getOptionLabel={(option) => option[subPath.accessor]}
            style={{width: '100%'}}
            renderInput={(params) => (
                <TextField
                    {...params}
                    InputProps={{
                        ...params.InputProps,
                        className: classes.input,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={18}/> : params.InputProps.endAdornment}
                                {}
                            </React.Fragment>)
                    }}
                    inputRef={inputRef}
                    fullWidth
                    size='small'
                    error={error}
                />)}
        />
    );
}