import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';
import * as api from '../../../api/api'
import {TextField, Dialog} from '@material-ui/core';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Handbook from '../Handbook';
import OneElement from './OneElement';
import useStyle from './oneElementStyle';

const filter = createFilterOptions();

export default function AsyncInputSelect({width, setIsValidArray, setIsChangedArray, editing, startValue, label, subPath, selectHandler}) {
    const classes = useStyle({width});
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(startValue ?? {})//внутреннее значение
    const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = useState([]);
    const [openModalHandbook, setOpenModalHandbook] = useState(false);
    const [openModalOneElement, setOpenModalOneElement] = useState(false);
    const [preparedValue, setPreparedValue] = useState({})
    const [isChanged, setIsChanged] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const {current: initId} = useRef(startValue?.id)

    useEffect(() => {
        setIsValid(!!value.id)
        setIsChanged(initId !== value.id)
    }, [value]);

    useEffect(() => {
        setIsChangedArray(isChanged)
    }, [isChanged]);

    useEffect(() => {
        setIsValidArray(isValid)
    }, [isValid]);


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

    function closeAutocompleteHandler() {
        setIsOpen(false)
        setOptions([])
    }

    function modalCancelHandler() {
        setOpenModalHandbook(false)
        setOpenModalOneElement(false)
    }

    function modalSubmitHandler(data, elementData) {
        const newValue = {...data, ...elementData}
        setValue(newValue)
        selectHandler(newValue)
        setOpenModalHandbook(false)
        setOpenModalOneElement(false)
    }

    return (<>
        {openModalHandbook ?
            <Dialog
                maxWidth={false}
                PaperComponent='div'
                className={classes.root}
                open={openModalHandbook}
                onClose={modalCancelHandler}>
                <Box style={{
                    display: 'flex',
                    height: 'calc(100vh - 64px)',
                    paddingBottom: '8px',
                    justifyContent: 'center',
                }}>
                    <Handbook
                        handbook={subPath.path}
                        clickRowHandler={modalSubmitHandler}
                    />
                </Box>
            </Dialog> : null}
        {openModalOneElement ?
            <OneElement
                open={openModalOneElement}
                cancelHandler={modalCancelHandler}
                submitHandler={modalSubmitHandler}
                subValue={{handbookName: subPath.path, id: 'add'}}
                preparedValue={preparedValue}/> : null
        }
        {editing ? (
                <Autocomplete
                    className={classes.inputMui}
                    options={options}
                    value={value}
                    inputValue={inputValue}
                    noOptionsText='пусто'
                    disableClearable
                    getOptionSelected={(option, value) => option.id === value.id}
                    onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                    onChange={(e, newValue) => {
                        if (typeof newValue === 'string') {
                            setTimeout(() => {
                                setPreparedValue({[subPath.accessor]: newValue})
                                console.log('1')
                                setOpenModalOneElement(true);
                            });
                        } else if (newValue && newValue.inputValue) {
                            setPreparedValue({[subPath.accessor]: newValue.inputValue})
                            console.log('2')
                            newValue.newWindow ? setOpenModalHandbook(true) : setOpenModalOneElement(true);
                        } else {
                            setValue(newValue)
                            selectHandler(newValue)
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        if (params.inputValue !== '') {
                            filtered.push(
                                {
                                    inputValue: params.inputValue,
                                    [subPath.accessor]: `Создать "${params.inputValue}"`,
                                },
                                {
                                    inputValue: params.inputValue,
                                    [subPath.accessor]: `Поиск в новом окне`,
                                    newWindow: true,
                                },
                            );
                        }
                        return filtered;
                    }}
                    onOpen={() => setIsOpen(true)}
                    onClose={closeAutocompleteHandler}
                    getOptionLabel={(option) => option[subPath.accessor] || ''}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            InputLabelProps={{shrink: true}}
                            error={!isValid}
                            disabled={!editing}
                            required={editing}
                            label={label ?? ''}
                            className={clsx(isChanged && isValid && classes.inputChanged,)}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ?
                                            <CircularProgress style={{marginLeft: 'auto'}} color="inherit"
                                                              size={18}/> : params.InputProps.endAdornment}
                                        {}
                                    </React.Fragment>)
                            }}
                        />)}
                />)
            : (
                <TextField
                    InputLabelProps={{shrink: true}}
                    disabled={!editing}
                    required={editing}
                    label={label ?? ''}
                    className={clsx(classes.inputMui, !editing && classes.inputDisabled)}
                    value={startValue[subPath.accessor]}
                />)}
    </>);
}