import React, { useCallback } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { TYPE } from '../../../structure/handbookStructure/handbook';
import useStyle from '../handbookStyle';
import clsx from 'clsx';

export default function Row({ clickRowHandler = () => {}, columns, data, deleteClass, children }) {
  const classes = useStyle();

  function dateFormat(date = '') {
    if (!date) return '';
    return date.split('-').reverse().join('.');
  }

  function valueSwitch(column, value) {
    switch (column.type) {
      case TYPE.BOOLEAN:
        return column.options[Number(value)];
      case TYPE.DATE:
        return dateFormat(value);
      case TYPE.SUB_VALUE:
        return value?.[column.subPath?.accessor];
      case TYPE.SUB_SUB_VALUE:
        return value[column?.subSubPath?.accessor]?.[column.subSubPath.subAccessor];
      default:
        return value;
    }
  }

  const cell = useCallback((value, column, index) => {
    if (!column.mainValue) return null;
    return (
      <TableCell style={{ verticalAlign: 'middle' }} key={column.accessor + index}>
        {valueSwitch(column, value)}
      </TableCell>
    );
  }, []);

  return (
    <TableRow onClick={clickRowHandler} hover={!deleteClass} className={clsx(classes.row, deleteClass && classes.rowDelete)}>
      {children ? (
        <TableCell style={{ paddingLeft: '8px', paddingRight: '8px', verticalAlign: 'middle' }} padding='checkbox'>
          {children}
        </TableCell>
      ) : null}
      {columns.map((column, index) => cell(data[column.accessor], column, index))}
    </TableRow>
  );
}
