import React, {useEffect, useState} from 'react';
import {getHandbook} from '../../api/api';
import {useTable} from 'react-table';
import {handbooks} from '../../handbooks/handbook';
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const EditableCell = ({
                          value: initialValue,
                          row: { index },
                          column: { id },
                          updateMyData, // This is a custom function that we supplied to our table instance
                      }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }
    const onBlur = () => {
        updateMyData(index, id, value)
    }
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer

const defaultColumn = {
    Cell: EditableCell,
}

export default function Handbook(props) {
    const [handbook] = useState(props.match.params.name);
    const [columns] = useState(handbooks[handbook].columns);
    const [data, setData] = useState([]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
        defaultColumn,
    })

    useEffect(() => {
        getHandbook(handbook)
            .then(resp => setData(resp.data))
            .catch((err) => console.log(err.message))
    }, [handbook])

    return (
        <MaUTable {...getTableProps()}>
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <TableRow {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <TableCell {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
        </MaUTable>
        )
}