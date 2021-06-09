import React, {useEffect, useState} from 'react';
import {TableCell, TableRow} from '@material-ui/core';
import CollapseRowInterface from './CollapseRowInterface';
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

export default function Row({
                                columns, data, showInput, deleteClass, actionComponent, actionInterfaceHandler, cancelInterfaceHandler, validHandler = () => {
    }, colSpan
                            }) {
    const classes = useStyle();
    const [rowData, setRowData] = useState(data);
    const [isChanged, setIsChanged] = useState(false);
    const [validMask, setValidMask] = useState({})
    const [isValidRow, setIsValidRow] = useState(true)

    useEffect(() => {
            if (showInput) validHandler(isValidRow)
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

    function updateValues(value, column) {
        const newValue = value.length <= column.maxLength ? value : value.slice(0, column.maxLength)
        setRowData(prev => ({...prev, [column.accessor]: newValue}))
    }

    const cellProps = (column) => (showInput && (column.accessor.toUpperCase() !== 'ID')) ?
        {
            component: CellInput,
            inputHandler: (value) => updateValues(value, column),
            isValid: validMask[column.accessor],
            focus: column.accessor === columns[1].accessor
        }
        : {}

    const row = columns.map((column) => (
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
            <TableCell
                style={{paddingLeft: '8px', paddingRight: '8px'}}
                padding="checkbox">
                {actionComponent}
            </TableCell>
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

