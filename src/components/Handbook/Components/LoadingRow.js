import {LinearProgress, TableCell, TableRow, Typography} from '@material-ui/core';
import React from 'react';

export default function LoadingRow({colSpan, empty}) {
    return <TableRow>
        <TableCell style={{padding: 0}}
                   colSpan={colSpan}>
            {empty ?
                <Typography variant='subtitle1' gutterBottom align='center'>Ничего не найдено...</Typography> :
                <LinearProgress/>}
        </TableCell>
    </TableRow>
}