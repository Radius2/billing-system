import {LinearProgress, TableCell, TableRow} from '@material-ui/core';
import React from 'react';

export default function LoadingRow ({colSpan}){
    return <TableRow>
        <TableCell style={{padding: 0}}
                   colSpan={colSpan}>
            <LinearProgress/>
        </TableCell>
    </TableRow>
}