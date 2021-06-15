import clsx from 'clsx';
import React, {useCallback, useContext, useEffect, useState, useRef} from 'react';
import {
    Box,
    ButtonBase,
    LinearProgress,
    IconButton,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Checkbox,
    Tooltip
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import CreateIcon from '@material-ui/icons/Create';
import SideMenu from './SideMenu';
import ToolbarHeader from './ToolbarHeader';
import ModalMessage from '../Modal';
import FilterTextField from './FilterTextField';
import Row from './Row';
import Feedback from './Feedback'
import {LanguageContext} from '../../App';
import {handbooks} from '../../util/handbook';
import {INTERFACE_DIALOG, INTERFACE_LANGUAGE} from '../../util/language';
import * as api from '../../api/api';
import useStyle from './style';


//генерация пустых  данных для строки input
function newRowMask(columns) {
    const newArr = {}
    columns.forEach(({accessor}) => accessor.toUpperCase() === 'ID' ? null : newArr[accessor] = '')
    return newArr
}

function Rows (){
    return
}



export default function Handbook({match, pageSize = 20}) {
    const classes = useStyle();
    const {lang} = useContext(LanguageContext)
    const [handbook, setHandbook] = useState(match.params.name); // название формы
    const [columns, setColumns] = useState(handbooks[handbook].columns); //шапка формы
    const [editing, setEditing] = useState(true);
    const [data, setData] = useState([]); //данные формы
    const [errMessage, setErrMessage] = useState(''); //сообщение об ошибке
    const [openSnackbar, setSnackbar] = useState(false); //выплывающее окно о успешной опперации
    const [snackbarMess, setSnackbarMess] = useState('');//сообщение успешной операции
    const [selectedRows, setSelectedRows] = useState([]); // выбранная строка для редактирования
    const [currentMod, setCurrentMod] = useState('update'); // текущий режим изменения, удаление, добавление
    const [activeFilter, setActiveFilter] = useState(false); //активный фильтр
    const [newRow] = useState(newRowMask(columns));//пустая строка для создания нового элемента
    const [page, setPage] = useState(1);//страниза пагинации
    const [filterParams, setFilterParams] = useState({}) //фильтр квери параметры запроса элементов справочника
    const [sortParams, setSortParams] = useState({desc: 0, ordering: 'id'})//квери параметр сортировки
    const [loading, setLoading] = useState(false) // режим загрузки
    const [hasMore, setHasMore] = useState(false) // внутренняя безопасность
    const [showInfinityScrollRow, setShowInfinityScrollRow] = useState(false);
    const [isValid, setIsValid] = useState(true)
    const [showInvalid, setShowInvalid] = useState(false);
    const [colSpan, setColSpan] = useState(columns.length + 1)
    const [invalidSnackbar, setInvalidSnackbar] = useState(false)

    function focusInvalid() {
        setInvalidSnackbar(true)
        setShowInvalid(true)
    };

    function setDefaultCurrentMod() {
        setCurrentMod('update');
        setSelectedRows([])
    }

    function getElements(page) {
        setLoading(true);
        api.getHandbook(handbook, {page, page_size: pageSize, ...filterParams, ...sortParams})
            .then((resp) => {
                const currentDataLength = (page === 1) ? 0 : data.length
                setHasMore(resp.data.count > (resp.data.values.length + currentDataLength) && resp.data.values.length === pageSize)
                setData(prev => {
                    return (page === 1) ? resp.data.values : [...prev, ...resp.data.values]
                });
            })
            .catch((err) => {
                setHasMore(false);
                setErrMessage(err.message)
            })
            .finally(() => {
                setLoading(false);
                setShowInfinityScrollRow(true);
            })
    }

    useEffect(() => {
        setHandbook(match.params.name);
        setColumns(handbooks[handbook].columns);
        setData([]);
        setCurrentMod('update');
        //setEditing(false);
        setSelectedRows([]);
        setActiveFilter(false);
        setFilterParams({});
    }, [match, handbook])

    useEffect(() => {
        if (selectedRows.length === 0) setIsValid(true);
    }, [selectedRows])

    useEffect(() => {
        editing ? setColSpan(columns.length + 1) : setColSpan(columns.length)
    }, [editing])


    useEffect(() => setIsValid(true),
        [currentMod])

    //получение данных справочника при загрузке компонента
    useEffect(() => {
        setPage(1);
        const timer = setTimeout(() => {
            getElements(1);
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [handbook, filterParams, sortParams])

    useEffect(() => {
            if (page > 1) getElements(page)
        }
        , [page])


    useEffect(() => {
        if (!activeFilter) {
            setFilterParams(prev => Object.keys(prev).length === 0 ? prev : {})
        }
    }, [activeFilter])


    //удалить строку локально и из БД
    const deleteRows = useCallback(() => {
            const ids = selectedRows.map((index) => data[index].id);
            api.delElementsHandbook(handbook, ids)
                .then(() => {
                    setSelectedRows([]);
                    setData(prev => {
                        setSnackbar(true);
                        setSnackbarMess(INTERFACE_DIALOG.successDeleteModal[lang])
                        const newArr = [...prev];
                        selectedRows.sort((a, b) => b - a).forEach(index => newArr.splice(index, 1))
                        return newArr
                    })
                })
                .catch(err => setErrMessage(err.message))
                .finally(() => setCurrentMod('update'))
        }
        , [handbook, selectedRows]
    )


//сохранить новую строку в БД  и запросить новую строку в локальный справочник
    const addRow = useCallback((payload) => {
        api.addElementHandbook(handbook, payload)
            .then((resp) => {
                return api.getElementHandbook(handbook, resp.data.id)
            })
            .then(resp => {
                setSnackbar(true);
                setCurrentMod('update')
                setSnackbarMess(INTERFACE_DIALOG.successSaveModal[lang]);
                (setData(prev => ([...prev, resp.data])));
            })
            .catch(err => setErrMessage(err.message))
    }, [handbook])

//обновить строку и получить перезаписанную сткоку из БД
    const updateRow = (payload, index) => {
        if (!isValid) return focusInvalid();
        return api.updElementHandbook(handbook, payload)
            .then((resp) => {
                return api.getElementHandbook(handbook, resp.data.id)
            })
            .then(resp => {
                if (index === selectedRows[0]) {
                    setSelectedRows([])
                }
                setData(prev => {
                    prev[index] = resp.data;
                    return [...prev]
                })
                setSnackbar(true);
                setSnackbarMess(INTERFACE_DIALOG.successSaveModal[lang]);
            })
            .catch(err => setErrMessage(err.message))
    }

    const closeErrMessageHandler = useCallback(() => {
        setErrMessage('')
    }, [])

    const actionComponent = (index, active) => {
        switch (currentMod) {
            case 'update':
                return <Tooltip title={INTERFACE_LANGUAGE.update[lang]}>
                    <IconButton
                        onClick={() => isValid ? setSelectedRows([index]) : focusInvalid()}
                        color={active ? 'primary' : 'default'}
                        size='small'>
                        <CreateIcon/>
                    </IconButton>
                </Tooltip>;
            case 'delete':
                return <Checkbox
                    color='default'
                    checked={active}
                    style={{padding: '3px'}}
                    onChange={() => setSelectedRows(prevState => {
                        if (prevState.includes(index)) {
                            prevState.splice(prevState.indexOf(index), 1)
                            return [...prevState]
                        }
                        return [...prevState, index]
                    })}/>
            default:
                return null
        }
    }

    const observer = useRef()
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


    function changeModHandler(newMod) {
        if (!isValid) return focusInvalid();
        setSelectedRows([])
        newMod === currentMod ?
            setCurrentMod('update') :
            setCurrentMod(newMod)
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <Box className={classes.root}>

                <SideMenu
                    lang={lang}
                    currentMod={currentMod}
                    changeModHandler={changeModHandler}/>

            <ModalMessage open={!!errMessage} message={errMessage} close={closeErrMessageHandler}/>
            <Feedback
                openSnackbar={invalidSnackbar || openSnackbar}
                snackbarCloseHandler={() => {
                    setSnackbar(false);
                    setInvalidSnackbar(false)
                }}
                snackbarMess={openSnackbar ? snackbarMess : INTERFACE_DIALOG.invalidRequiredField[lang]}
                success={openSnackbar}/>
            <Box component={Paper} elevation={3}
                 style={{display: 'flex', flexFlow: 'column', maxHeight: '100%', overflow: 'hidden'}}>
                {/*Шапка над таблицей*/}
                <ToolbarHeader
                    handbookName={handbooks[handbook].name[lang]}
                    deleteMod={selectedRows.length > 0 && currentMod === 'delete'}
                    selected={selectedRows.length}
                    filterToggleHandler={() => setActiveFilter(!activeFilter)}
                    activeFilterMod={activeFilter}
                    cancelButtonHandler={setDefaultCurrentMod}
                    deleteButtonHandler={deleteRows}
                />

                <TableContainer style={{maxWidth: handbooks[handbook].maxWidth}}>
                    <Table style={{tableLayout: 'fixed'}} stickyHeader>
                        <TableHead>
                            <TableRow className={classes.rowHeader}>
                                {editing ? <TableCell style={{width: '46px'}}/> : null}
                                {columns.map((column) => (
                                    <TableCell
                                        style={{verticalAlign: 'top', width: column.width ?? 'auto'}}
                                        key={column.accessor}>
                                        <ButtonBase className={classes.sortButton} disableTouchRipple onClick={() => {
                                            if (selectedRows.length > 0) return
                                            if (sortParams.ordering !== column.accessor) return setSortParams({
                                                ordering: column.accessor,
                                                desc: 0
                                            })
                                            setSortParams({
                                                ordering: column.accessor,
                                                desc: sortParams.desc === 0 ? 1 : 0
                                            })
                                        }}>
                                            <Typography variant='subtitle2'>
                                                {column.Header[lang]}
                                            </Typography>
                                            <ArrowUpwardIcon
                                                className={clsx(classes.sortButton__arrow, sortParams.ordering === column.accessor && [classes.sortButton__arrow_active, sortParams.desc && classes.sortButton__arrow_turn])}
                                                fontSize='small'/>
                                        </ButtonBase>
                                        {activeFilter && column.filter ?
                                            <FilterTextField filterHandler={(value) => {
                                                setSelectedRows([]);
                                                setCurrentMod('update');
                                                setFilterParams(prev => ({
                                                    ...prev,
                                                    [column.accessor]: value
                                                }))
                                            }}/>
                                            : null}
                                    </TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(currentMod === 'add') ?
                                <Row showInput={true}
                                     actionComponent={null}
                                     columns={columns} data={newRow}
                                     colSpan={colSpan}
                                     actionInterfaceHandler={addRow}
                                     cancelInterfaceHandler={() => setCurrentMod('update')}/>
                                : null
                            }
                            {loading ?
                                <TableRow><TableCell style={{padding: 0}}
                                                     colSpan={colSpan}><LinearProgress/></TableCell></TableRow> : null}
                            {data.map((dataRow, index) => {
                                const selected = selectedRows.includes(index);
                                const valid = selected && currentMod === 'update' ? {validHandler: setIsValid} : {}
                                return (<Row
                                    key={dataRow.id}
                                    editing={editing}
                                    columns={columns}
                                    setShowInvalid={setShowInvalid}
                                    showInvalid={showInvalid}
                                    data={dataRow}
                                    colSpan={colSpan}
                                    deleteClass={selected && currentMod === 'delete'}
                                    showInput={selected && currentMod === 'update'}
                                    actionInterfaceHandler={(payload) => updateRow(payload, index)}
                                    cancelInterfaceHandler={() => setSelectedRows([])}
                                    actionComponent={actionComponent(index, selectedRows.includes(index))}
                                    {...valid}
                                />)
                            })}
                            {hasMore && showInfinityScrollRow ?
                                <TableRow ref={lastRow}>
                                    <TableCell colSpan={colSpan}/>
                                </TableRow>
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Box>

    )
}