import React, {useState} from 'react';
import {TableCell, TableRow} from '@material-ui/core';
import useStyle from './style';
import CellInput from './CellInput';
import clsx from 'clsx';
import CollapseRowInterface from './CollapseRowInterface';


export default function Row({index, columns, data, interfaceMod, actionInterfaceHandler, cancelInterfaceHandler, interfaceActionName, openInterface, clickHandler}) {
    const classes = useStyle();
    const [rowData, setRowData] = useState(data);
    const [isChanged, setIsChanged] = useState(false);
    const [focusAccessor, setFocusAccessor] = useState('')

    function updateValues(value, accessor) {
        return (rowData[accessor] !== value)
            ? (setIsChanged(true),
                setRowData(prev => ({...prev, [accessor]: value})))
            : null
    }

    const cellProps = (accessor) => (openInterface && (interfaceMod==='update') && (accessor.toUpperCase() !== 'ID')) ?
        {
            component: CellInput,
            blurHandler: (value) => updateValues(value, accessor),
            focus: focusAccessor === accessor
        }
        : {component: 'td'}

    const row = columns.map(({accessor}) => (
        <TableCell
            key={accessor}
            {...cellProps(accessor)}
            data-accessor={accessor}>
            {rowData[accessor]}
        </TableCell>)
    )
    return <>
        <TableRow
            onClick={(e) => {
                setFocusAccessor(e.target.dataset.accessor);
                clickHandler()
            }}
            hover={!isChanged && !openInterface}
            className={clsx(classes.row, isChanged && classes.rowChanged, !openInterface && classes.rowButton)}>
            {row}
        </TableRow>
        <CollapseRowInterface
            colSpan={columns.length}
            open={openInterface}
            onCloseHandler={() => setRowData(data)}
            actionName={interfaceActionName}
            actionHandler={() => {
                actionInterfaceHandler(rowData, index)
            }}
            cancelHandler={() => {
                cancelInterfaceHandler();
                setRowData(data);
            }}/>
    </>

}

