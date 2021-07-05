import React from 'react';
import TableForm from '../../TableForm/TableForm';
import {str, structureTable} from '../contractStructure'
import ContractOneElement from './ContractOneElement';

export default function ContactTable() {
    return <TableForm
        formStructure={structureTable}
        OneElementComponent={(props) =>(
            <ContractOneElement
                {...props}
                str={str}
                formStructure={structureTable}
            />)}
    />
}