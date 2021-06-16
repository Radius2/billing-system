import CreateIcon from '@material-ui/icons/Create';
import React, { useContext, useEffect, useMemo, useState} from 'react';
import {Checkbox, IconButton, TableCell, TableRow, Tooltip} from '@material-ui/core';
import {LanguageContext} from '../../App';
import {INTERFACE_LANGUAGE} from '../../util/language';
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
        setIsChanged(false);
        for (let i = 0; i < columns.length; i++) {
            const accessor = columns[i].accessor;
            if (rowData[accessor] !== data[accessor]) {
                setIsChanged(true);
                break
            }
        }

    }, [rowData, data])

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
        const newValue = value.length <= column.maxLength ? value : value.slice(0, column.maxLength)
        setRowData(prev => ({...prev, [column.accessor]: newValue}))
    }

    const cellProps = (column, index) => (showInput && (column.accessor.toUpperCase() !== 'ID')) ?
        {
            component: CellInput,
            inputHandler: (value) => updateValues(value, column),
            isValid: validMask[column.accessor],
            focus: column.accessor === columns[1].accessor,
            showInvalid: showInvalid
        }
        : {}

    const row = columns.map((column, index) => (
        <TableCell
            key={column.accessor}
            {...cellProps(column)}>
            {rowData[column.accessor]}
        </TableCell>)
    )
    return <>
        <TableRow
            hover={!showInput && !isChanged && !deleteClass}
            className={clsx(classes.row, isChanged && classes.rowChanged, deleteClass && classes.rowDelete)}>
            {editing ? <TableCell
                style={{paddingLeft: '8px', paddingRight: '8px'}}
                padding="checkbox">
                {actionComponent}
            </TableCell> : null}
            {row}
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