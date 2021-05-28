import Button from '@material-ui/core/Button';
import React, {useCallback, useEffect, useState} from 'react';
import {
    getHandbook,
    delElementHandbook,
    addElementHandbook,
    getElementHandbook,
    updElementHandbook
} from '../../api/api';
import {handbooks} from '../../handbooks/handbook';
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField} from '@material-ui/core';
import {useInput} from '../../hooks/useInput';
import {makeStyles} from '@material-ui/core';
import ModalMessage from '../Modal';

// const useStyle = makeStyles((theme)=>{
//
// })

function CellInput(props) {
    const [textField, setTextField] = useState(props.value);
    useEffect(() => {
        setTextField(props.value || '')
    }, [props.value])
    return (
        <TableCell>
            <TextField fullWidth
                       autoFocus={props.autoFocus}
                       value={textField}
                       onChange={e => setTextField(prev => e.target.value)}
                       onBlur={(e) => props.save(e.target.value)}/>
        </TableCell>
    )
}

export default function Handbook(props) {
    const [handbook] = useState(props.match.params.name); // название формы
    const [columns] = useState(handbooks[handbook].columns); //шапка формы
    const [data, setData] = useState([]); //данные формы
    const [errMessage, setErrMessage] = useState(''); //сообщение об ошибке
    const [newRow, setNewRow] = useState([newRowMask(columns)]) // подготовленная новая строка

    //генерация пустых данных
    function newRowMask(columns) {
        const newArr = {}
        columns.forEach(({accessor}) => accessor.toUpperCase() === 'ID' ? null : newArr[accessor] = '')
        return newArr
    }

    //получение данных при загрузке компонента
    useEffect(() => {
        getHandbook(handbook)
            .then(resp => setData(resp.data))
            .catch((err) => setErrMessage(err.message))
    }, [handbook])

    //генератор строки
    const row = useCallback((item, index, setFunction, showID = true) => {
        return columns.map(({accessor}) => (accessor.toUpperCase() === 'ID') ?
            <TableCell key={accessor}>{showID ? item[accessor] : 'новая'}</TableCell> :
            <CellInput key={accessor} value={item[accessor]}
                       save={(value) => saveNewValue(index, accessor, value, setFunction)}/>)
    }, [columns])

    //удалить строку локально и из БД
    const deleteRow = useCallback((id, index) => {
        delElementHandbook(handbook, id)
            .then(() => setData(prev => {
                const newArr = [...prev];
                newArr.splice(index, 1)
                return newArr
            }))
            .catch(err => setErrMessage(err.message))
    }, [handbook])

    //создать строку и запросить новую строку
    const addRow = useCallback((payload) => {
        addElementHandbook(handbook, payload)
            .then((resp) => {
                setNewRow([newRowMask(columns)])
                return getElementHandbook(handbook, resp.data.id)
            })
            .then(resp => (setData(prev => ([...prev, resp.data]))))
            .catch(err => setErrMessage(err.message))
    }, [handbook])

    //обновить строку и получить перезаписанный элемент
    const updateRow = useCallback((payload, index) => {
        updElementHandbook(handbook, payload)
            .then((resp) => {
                return getElementHandbook(handbook, resp.data.id)
            })
            .then(resp => {
                setData(prev => {
                    prev[index] = resp.data;
                    return [...prev]
                })
            })
            .catch(err => setErrMessage(err.message))
    }, [handbook])

    //обновление переменной строки локально
    function saveNewValue(index, accessor, newValue, setFunction) {
        setFunction((prev) => {
            const newData = [...prev];
            newData[index] = {...newData[index], [accessor]: newValue};
            return newData;
        })
    }

    return (
        <>
            <ModalMessage open={errMessage?true:false} message={errMessage} close={()=>setErrMessage('')}/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((head) => <TableCell key={head.accessor}>{head.Header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => <TableRow key={item.id}>{row(item, index, setData)}
                            <Button onClick={() => deleteRow(item.id, index)}>удалить</Button>
                            <Button onClick={() => updateRow(item, index)}>изменить</Button>
                        </TableRow>)}
                        <TableRow>{row(newRow[0], 0, setNewRow, false)}
                            <Button onClick={() => addRow(newRow[0])}>сохранить</Button>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}