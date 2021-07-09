import React from 'react';
import TableForm from '../TableForm/TableForm';
import {str, structureTable} from '../formStructures/contractStructure'
import OneElementTableForm from '../TableForm/OneElementTableForm/OneElementTableForm';

export default function Contacts() {
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