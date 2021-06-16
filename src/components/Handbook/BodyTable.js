import {TableBody, TableCell, TableRow,} from '@material-ui/core';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import * as api from '../../api/api';
import {LanguageContext} from '../../App';
import {INTERFACE_DIALOG} from '../../util/language';
import {ModContext} from './Handbook';
import LoadingRow from './LoadingRow';
import Row from './Row';
import useData from './useData';

//генерация пустых  данных для строки input
function newRowMask(columns) {
    const newArr = {}
    columns.forEach(({accessor}) => accessor.toUpperCase() === 'ID' ? null : newArr[accessor] = '')
    return newArr
}

export default function BodyTable({handbookName, loading, getElements, addRow, updateRow, data, hasMore, showInfinityScrollRow, columns, filterParams, sortParams,}) {
    const {
        currentMod,
        selectedRows,
        setDefaultCurrentMod,
        colSpan
    } = useContext(ModContext);

    const [newRow] = useState(newRowMask(columns));//пустая строка для создания нового элемента
    const [page, setPage] = useState(1);//страниза пагинации
    const observer = useRef() // ссылка на пустую последнюю строку

    const lastRow = useCallback(node => {
        if (loading) return null
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    //получение данных справочника при загрузке компонента
    useEffect(() => {
        setPage(1);
        const timer = setTimeout(() => {
            getElements(1);
        }, 300);
        return () => {
            clearTimeout(timer);
        }
    }, [handbookName, filterParams, sortParams, getElements])

    useEffect(() => {
            if (page > 1) getElements(page)
        }
        , [page])

    return <TableBody>
        {(currentMod === 'add') ?
            <Row showInput={true}
                 actionComponent={null}
                 columns={columns}
                 data={newRow}
                 actionInterfaceHandler={addRow}
                 cancelInterfaceHandler={setDefaultCurrentMod}/>
            : null
        }
        {loading ? <LoadingRow colSpan={colSpan}/> : null}
        {data.map((dataRow, index) => {
            const selected = selectedRows.includes(index);
            return (<Row
                key={dataRow.id}
                index={index}
                columns={columns}
                data={dataRow}
                deleteClass={selected && currentMod === 'delete'}
                showInput={selected && currentMod === 'update'}
                actionInterfaceHandler={(payload) => updateRow(payload, index)}
                cancelInterfaceHandler={setDefaultCurrentMod}
                selected={selected}
            />)
        })}
        {hasMore && showInfinityScrollRow ?
            <TableRow ref={lastRow}>
                <TableCell colSpan={colSpan}/>
            </TableRow>
            : null}
    </TableBody>
}