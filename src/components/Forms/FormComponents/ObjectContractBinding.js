import React from 'react';
import TableForm from '../TableForm/TableForm';
import {str, structureTable} from '../formStructures/objContractsStructure'
import OneElementTableForm from '../TableForm/OneElementTableForm/OneElementTableForm';

export default function ObjectContractBinding() {
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