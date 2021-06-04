import {TableCell, TableRow} from '@material-ui/core';
import React, {useState} from 'react';
import CellInput from './CellInput';
import CollapseRowInterface from './CollapseRowInterface';
import useStyle from './style';

//генерация пустых  данных для строки input
function newRowMask(columns) {
    const newArr = {}
    columns.forEach(({accessor}) => accessor.toUpperCase() === 'ID' ? null : newArr[accessor] = '')
    return newArr
}


export default function NewRow({columns, saveHandler, saveLanguage, cancelInterfaceHandler}) {
    const classes = useStyle();
    const [rowData, setRowData] = useState(newRowMask(columns))

    function updateValues(value, accessor) {
        setRowData(prev => ({...prev, [accessor]: value}))
    }

    return (
        <>
            <TableRow className={classes.row}>
                {columns.map(({accessor}) => (accessor.toUpperCase() === 'ID' ?
                    <TableCell key={accessor}/> :
                    <CellInput
                        key={accessor}
                        blurHandler={(value) => updateValues(value, accessor)}>
                        {rowData[accessor]}
                    </CellInput>))}
            </TableRow>
            <CollapseRowInterface
                open={true}
                colSpan={columns.length}
                actionHandler={() => {
                    cancelInterfaceHandler();
                    saveHandler(rowData)
                }}
                actionName={saveLanguage}
                cancelHandler={cancelInterfaceHandler}/>
        </>
    )
}