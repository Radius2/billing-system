import CircularProgress from '@material-ui/core/CircularProgress';
import * as api from '../../api/api'
import {TextField, Box, MenuItem, MenuList, Paper} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowDown from '@material-ui/icons/ArrowDropDown';
import React, {useCallback, useEffect, useRef, useState} from 'react';

const useStyle = makeStyles(theme => ({
    input: {
        fontSize: 14
    },
}))

export default function AsyncInputSelect({value = '', showInvalid, subPath, selectHandler, isValid, focus = false}) {
    const [inputFocus, setInputFocus] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState(value)
    const classes = useStyle();
    const error = !isValid;
    const inputRef = useRef();

    const getOptions = useCallback(() => {
        if (input !== value) selectHandler(null)
        api.getHandbook(subPath.path,
            {
                [subPath.accessor]: '%' + input,
                page_size: 7
            })
            .then(({data}) => {
                setOptions(data.values)
            })
            .catch(() => console.log('err'))
            .finally(() => setLoading(false))
    }, [input])

    // фокус на невалид
    useEffect(() => {
        if (!isValid && showInvalid) {
            inputRef.current.focus()
        }
    }, [showInvalid, isValid])

    useEffect(() => {
            if (inputFocus) {
                setLoading(true)
                const timer = setTimeout(() => {
                    getOptions();
                }, 500);
                return () => {
                    setLoading(false);
                    clearTimeout(timer);
                }

            }
        }, [input, inputFocus]
    )


    return (
        <Box style={{position: 'relative', width: '100%', height: '100%'}}>
            <TextField
                inputRef={inputRef}
                fullWidth
                size='small'
                error={error}
                multiline
                autoFocus={focus}
                rowsMax={4}
                value={input}
                onChange={(e) => {
                    setInput(e.target.value)
                }}
                inputProps={{className: classes.input}}
                onFocus={() => setInputFocus(true)}
                InputProps={{
                    endAdornment: (
                        <>
                            {loading ? <CircularProgress color="inherit" size={14}/> : <ArrowDown style={{fontSize:'18px'}} />}
                        </>)
                }}
            />
            {inputFocus ?
                <Paper
                    square
                    elevation={10}
                    style={{
                        marginTop: '3px',
                        position: 'absolute',
                        width: '150%',
                        right: 0,
                        zIndex: 1000
                    }}>
                    <MenuList>
                        {options.length > 0 ?
                            options.map(option => (
                                <MenuItem
                                    key={option.id}
                                    onClick={() => {
                                        selectHandler(option)
                                        setInputFocus(false)
                                        setInput(option[subPath.accessor])
                                        setOptions([])
                                    }}>
                                    {option[subPath.accessor]}
                                </MenuItem>)) : <MenuItem>{loading ? 'Загрузка' : 'Пусто'}</MenuItem>
                        }
                    </MenuList>
                </Paper> : null}
        </Box>
    )
}