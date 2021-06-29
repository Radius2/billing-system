import React, {useCallback} from 'react';
import {TableCell, TableRow} from '@material-ui/core';
import {TYPE} from '../../util/handbook';
import useStyle from './style';
import clsx from 'clsx';

export default function Row({clickRowHandler, columns, data, deleteClass, children}) {
    const classes = useStyle();


    function dateFormat(date = '') {
        if (!date) return ''
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

    const cell = useCallback((dataCell,column,index) => {
        if (!column.mainValue) return null
        const {type} = column;
        const subValue = type === TYPE.SUB_VALUE
        const value = !subValue ? dataCell : dataCell?.[column.subPath.accessor];
        return (
            <TableCell
                key={column.accessor+index}>
                {valueSwitch(column, value)}
            </TableCell>)
        },[])

    return(
        <TableRow
            onClick={clickRowHandler}
            hover={!deleteClass}
            className={clsx(classes.row, deleteClass && classes.rowDelete)}>
            {children ? <TableCell
                style={{paddingLeft: '8px', paddingRight: '8px'}}
                padding="checkbox">
                {children}
            </TableCell> : null}
            {columns.map((column,index) => cell(data[column.accessor],column,index))}
        </TableRow>)
}