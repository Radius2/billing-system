import CreateIcon from '@material-ui/icons/Create';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Checkbox, IconButton, TableCell, TableRow, Tooltip} from '@material-ui/core';
import {LanguageContext} from '../../App';
import {TYPE} from '../../util/handbook';
import {INTERFACE_LANGUAGE} from '../../util/language';
import AsyncInputSelect from './AsyncInputSelect';
import CollapseRowInterface from './CollapseRowInterface';
import {ModContext} from './Handbook';
import useStyle from './style';
import CellInput from './CellInput';
import clsx from 'clsx';

const validation = (data, columns) => {
    const validator = {}
    columns.forEach((column) => {
        validator[column.accessor] = !!(!column.required || data[column.accessor]?.toString())
    })
    return validator
}

export default function Row({columns, index, data, showInput, selected, deleteClass, actionInterfaceHandler, cancelInterfaceHandler}) {
    const classes = useStyle();
    const {lang} = useContext(LanguageContext)
    const [rowData, setRowData] = useState(data);
    const [isChanged, setIsChanged] = useState(false);
    const [validMask, setValidMask] = useState({})
    const [isValidRow, setIsValidRow] = useState(true)


    const {
        currentMod,
        checkValid,
        setIsValid,
        showInvalid,
        setShowInvalid,
        colSpan,
        editing,
        setSelectedRows
    } = useContext(ModContext)

    useEffect(() => {
        if (showInvalid && showInput) {
            setShowInvalid(false)
        }
    }, [setShowInvalid, showInvalid, showInput])

    useEffect(() => {
            if (showInput) setIsValid(isValidRow)
        },
        [isValidRow, showInput]
    )

    useEffect(() => {
        const newValidMask = validation(rowData, columns)
        setValidMask(newValidMask);
        setIsValidRow(Object.values(newValidMask).reduce((prev, cur) => prev && cur, true))
    }, [rowData, columns])

    useEffect(() => {
        if (!selected) return setIsChanged(false);
        setIsChanged(false);
        for (let i = 0; i < columns.length; i++) {
            const {accessor, type} = columns[i];
            const prevValue = type === TYPE.SUB_VALUE ? rowData[accessor]?.id : rowData[accessor]
            const newValue = type === TYPE.SUB_VALUE ? data[accessor]?.id : data[accessor]
            if (prevValue !== newValue) {
                setIsChanged(true);
                break
            }
        }

    }, [rowData, data, selected])

    useEffect(() => {
        if (isChanged && !showInput) {
            actionInterfaceHandler(rowData)
        }
    }, [isChanged, showInput, rowData])

    const actionComponent = useMemo(() => {
        switch (currentMod) {
            case 'update':
                return <Tooltip title={INTERFACE_LANGUAGE.update[lang]}>
                    <IconButton
                        onClick={() => checkValid(() => setSelectedRows([index]))}
                        color={selected ? 'primary' : 'default'}
                        size='small'>
                        <CreateIcon/>
                    </IconButton>
                </Tooltip>;
            case 'delete':
                return <Checkbox
                    color='default'
                    checked={selected}
                    style={{padding: '3px'}}
                    onChange={() => setSelectedRows(prevState => {
                        if (prevState.includes(index)) {
                            prevState.splice(prevState.indexOf(index), 1)
                            return [...prevState]
                        }
                        return [...prevState, index]
                    })}/>
            default:
                return null
        }
    }, [currentMod, checkValid, lang, selected, index])

    function updateValues(value, column) {
        const newValue = (value.length <= column.maxLength) || column.type === TYPE.BOOLEAN ? value : value.slice(0, column.maxLength)
        setRowData(prev => ({...prev, [column.accessor]: newValue}))
    }

    function dateFormat(date = '') {
        return date.split('-').reverse().join('.')
    }

    function valueSwitch(column, value) {
        switch (column.type) {
            case TYPE.BOOLEAN:
                return column.options[Number(value)]
            case TYPE.DATE:
                return dateFormat(value)
            default:
                return value
        }
    }

    const cell = (column) => {
        const {type, accessor} = column;
        const subValue = type === TYPE.SUB_VALUE
        const value = !subValue ? rowData[accessor] : rowData[accessor]?.[column.subPath.accessor];
        if (!showInput || accessor.toUpperCase() === 'ID') return (
            <TableCell
                key={column.accessor}>
                {valueSwitch(column, value)}
            </TableCell>)

        switch (type) {
            default:
            case TYPE.STRING:
                return (
                    <CellInput
                        key={column.accessor}
                        inputHandler={(value) => updateValues(value, column)}
                        isValid={validMask[column.accessor]}
                        focus={column.accessor === columns[1].accessor}
                        showInvalid={showInvalid}>
                        {value}
                    </CellInput>);
            case TYPE.BOOLEAN:
                return (
                    <CellInput
                        key={column.accessor}
                        type={type}
                        options={column.options}
                        inputHandler={(value) => updateValues(value, column)}
                        isValid={validMask[column.accessor]}
                        focus={column.accessor === columns[1].accessor}
                        showInvalid={showInvalid}>
                        {value}
                    </CellInput>);
            case  TYPE.DATE:
                return (
                    <CellInput
                        key={column.accessor}
                        type='date'
                        inputHandler={(value) => updateValues(value, column)}
                        isValid={validMask[column.accessor]}
                        focus={column.accessor === columns[1].accessor}
                        showInvalid={showInvalid}>
                        {value}
                    </CellInput>)
            case TYPE.SUB_VALUE:
                return (
                    <TableCell key={column.accessor}>
                        <AsyncInputSelect
                            startValue={rowData[accessor]}
                            subPath={column.subPath}
                            isValid={validMask[column.accessor]}
                            selectHandler={value => setRowData(prev => (
                                {
                                    ...prev,
                                    [column.accessor]: value
                                }))}
                            showInvalid={showInvalid}/>
                    </TableCell>)
        }
    }

    return <>
        <TableRow
            hover={!showInput && !isChanged && !deleteClass}
            className={clsx(classes.row, isChanged && classes.rowChanged, deleteClass && classes.rowDelete)}>
            {editing ? <TableCell
                style={{paddingLeft: '8px', paddingRight: '8px'}}
                padding="checkbox">
                {actionComponent}
            </TableCell> : null}
            {columns.map(column => cell(column))}
        </TableRow>
        <CollapseRowInterface
            colSpan={colSpan}
            valid={isValidRow}
            cancelHandler={() => {
                cancelInterfaceHandler();
                setIsChanged(false);
                setRowData(data)
            }}
            className={clsx(isChanged && classes.rowChanged)}
            actionHandler={() => actionInterfaceHandler(rowData)}
            open={showInput}/>
    </>
}