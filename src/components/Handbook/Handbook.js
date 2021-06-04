import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    IconButton,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ModalMessage from '../Modal';
import NewRow from './NewRow';
import Row from './Row';
import Feedback from './Feedback'
import {LanguageContext} from '../../App';
import {handbooks} from '../../util/handbook';
import {INTERFACE_DIALOG, INTERFACE_LANGUAGE} from '../../util/language';
import * as api from '../../api/api';

const iconButton = [
    {name: 'delete', icon: <DeleteForeverIcon fontSize='small'/>},
    {name: 'update', icon: <CreateIcon fontSize='small'/>},
    {name: 'add', icon: <AddIcon fontSize='small'/>}
]

export default function Handbook(props) {
    const {lang} = useContext(LanguageContext)
    const [handbook] = useState(props.match.params.name); // название формы
    const [columns] = useState(handbooks[handbook].columns); //шапка формы
    const [data, setData] = useState([]); //данные формы
    const [errMessage, setErrMessage] = useState(''); //сообщение об ошибке
    const [openSnackbar, setSnackbar] = useState(false); //выплывающее окно о успешной опперации
    const [snackbarMess, setSnackbarMess] = useState('');//сообщение успешной операции
    const [currentRow, setCurrentRow] = useState(null);//текущая строка при изменении / удалении
    const [currentMod, setCurrentMod] = useState(null); // текущий режим изменение/удаление/добавление


    //получение данных справочника при загрузке компонента
    useEffect(() => {
        api.getHandbook(handbook)
            .then(resp => setData(resp.data))
            .catch((err) => setErrMessage(err.message))
    }, [handbook])

    //удалить строку локально и из БД
    const deleteRow = useCallback(({id}, index) => {
            api.delElementHandbook(handbook, id)
                .then(() => {
                    setCurrentRow(null);
                    setData(prev => {
                        setSnackbar(true);
                        setSnackbarMess(INTERFACE_DIALOG.successDeleteModal[lang])
                        const newArr = [...prev];
                        newArr.splice(index, 1)
                        return newArr
                    })
                })
                .catch(err => setErrMessage(err.message))
        }
        , [handbook]
    )

//сохранить новую строку в БД  и запросить новую строку в локальный справочник
    const addRow = useCallback((payload) => {
        api.addElementHandbook(handbook, payload)
            .then((resp) => {
                return api.getElementHandbook(handbook, resp.data.id)
            })
            .then(resp => {
                setSnackbar(true);
                setSnackbarMess(INTERFACE_DIALOG.successSaveModal[lang]);
                (setData(prev => ([...prev, resp.data])));
            })
            .catch(err => setErrMessage(err.message))
    }, [handbook])

//обновить строку и получить перезаписанную сткоку из БД
    const updateRow = useCallback((payload, index) => {
        api.updElementHandbook(handbook, payload)
            .then((resp) => {
                return api.getElementHandbook(handbook, resp.data.id)
            })
            .then(resp => {
                setData(prev => {
                    prev[index] = resp.data;
                    return [...prev]
                })
                setSnackbar(true);
                setCurrentRow(null);
                setSnackbarMess(INTERFACE_DIALOG.successSaveModal[lang]);
            })
            .catch(err => setErrMessage(err.message))
    }, [handbook])

    const snackbarCloseHandler = useCallback((event, reason) => {
        if (reason !== 'clickaway') {
            setSnackbar(false)
        }
    }, [])

    const closeErrMessageHandler = useCallback(() => {
        setErrMessage('')
    }, [])

    const updateMod = {
        actionInterfaceHandler: updateRow,
        interfaceActionName: INTERFACE_LANGUAGE.update[lang]
    }

    const deleteMod = {
        actionInterfaceHandler: deleteRow,
        interfaceActionName: INTERFACE_LANGUAGE.delete[lang]
    }

    const propsMod = (mode) => {
        switch (mode) {
            case 'delete':
                return deleteMod;
            case 'update':
                return updateMod;
            default:
                return null
        }
    }


    return (
        <>
            <ModalMessage open={!!errMessage} message={errMessage} close={closeErrMessageHandler}/>
            <Feedback
                openSnackbar={openSnackbar}
                snackbarCloseHandler={snackbarCloseHandler}
                snackbarMess={snackbarMess}/>
            <TableContainer style={{maxWidth: handbooks[handbook].maxWidth}} component={Paper} elevation={3}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                variant='head'
                                colSpan={columns.length}
                                style={{paddingTop: '2px', paddingBottom: '2px'}}>
                                {iconButton.map(button => (
                                    <IconButton key={button.name}
                                                color={currentMod === button.name ? 'primary' : 'default'}
                                                aria-label="delete"
                                                onClick={() => setCurrentMod((prev) => {
                                                    if (button.name !== prev) {
                                                        return button.name
                                                    }
                                                    setCurrentRow(null);
                                                    return null
                                                })}>
                                        {button.icon}
                                    </IconButton>))}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    width={column.width}
                                    variant='head'
                                    key={column.accessor}>
                                    {column.Header[lang]}
                                </TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(currentMod === 'add') ?
                            <NewRow
                                columns={columns}
                                saveHandler={addRow}
                                saveLanguage={INTERFACE_LANGUAGE.save[lang]}
                                cancelInterfaceHandler={() => setCurrentMod(null)}/>
                            : null
                        }
                        {data.map((dataRow, index) => (
                            <Row
                                key={dataRow.id}
                                index={index}
                                columns={columns}
                                data={dataRow}
                                clickHandler={() => currentMod && setCurrentRow(index)}
                                openInterface={index === currentRow}
                                interfaceMod={currentMod}
                                {...propsMod(currentMod)}
                                cancelInterfaceHandler={() => setCurrentRow(null)}
                            />))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}