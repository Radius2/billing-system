import React from 'react';
import TableForm from '../TableForm/TableForm';
import {str, structureTable} from '../formStructures/objectStructure'
import OneElementTableForm from '../TableForm/OneElementTableForm/OneElementTableForm';

export default function Objects() {
    return <TableForm
        formStructure={structureTable}
        OneElementComponent={(props) =>(
            <OneElementTableForm
                {...props}
                str={str}
                formStructure={structureTable}
            />)}
    />
}