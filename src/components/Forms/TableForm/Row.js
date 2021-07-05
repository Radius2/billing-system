import React, {useCallback} from 'react';
import {TableCell, TableRow} from '@material-ui/core';
import {TYPE} from '../util/constant';
import useStyle from './style';

export default function Row({clickRowHandler=()=>{}, columns, data}) {
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
            case TYPE.SUB_VALUE:
                return value[column.subPath.accessor];
            case TYPE.SUB_SUB_VALUE:
                return value[column?.subSubPath?.accessor]?.[column.subSubPath.subAccessor]
            default:
                return value
        }
    }

    const cell = useCallback((value,column,index) => {
        if (!column.mainValue) return null
        return (
            <TableCell
                key={column.accessor+index}>
                {valueSwitch(column, value)}
            </TableCell>)
        },[])

    return(
        <TableRow
            onClick={clickRowHandler}
            hover={true}
            className={classes.row}>
            {columns.map((column,index) => cell(data[column.accessor],column,index))}
        </TableRow>)
}