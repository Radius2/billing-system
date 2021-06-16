import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Box, Paper, TableContainer, Table} from '@material-ui/core';
import HeadTable from './HeadTable';
import SideMenu from './SideMenu';
import ToolbarHeader from './ToolbarHeader';
import ModalMessage from '../Modal';
import BodyTable from './BodyTable';
import Feedback from './Feedback'
import {LanguageContext} from '../../App';
import {handbooks} from '../../util/handbook';
import {INTERFACE_DIALOG} from '../../util/language';
import useStyle from './style';
import useData from './useData';

export const ModContext = React.createContext()

export default function Handbook({match}) {
    const classes = useStyle();
    const {lang} = useContext(LanguageContext)
    const [handbookName, setHandbook] = useState(match.params.name); // название формы
    const [columns, setColumns] = useState(handbooks[handbookName].columns); //шапка формы

    const [errMessage, setErrMessage] = useState(''); //сообщение об ошибке
    const [openSnackbar, setSnackbar] = useState(false); //выплывающее окно о успешной опперации
    const [invalidSnackbar, setInvalidSnackbar] = useState(false)
    const [snackbarMess, setSnackbarMess] = useState('');//сообщение
    const [selectedRows, setSelectedRows] = useState([]); // выбранная строка для редактирования
    const [currentMod, setCurrentMod] = useState('update'); // текущий режим изменения, удаление, добавление
    const [activeFilter, setActiveFilter] = useState(false); //активный фильтр
    const [filterParams, setFilterParams] = useState({}) //фильтр квери параметры запроса элементов справочника
    const [sortParams, setSortParams] = useState({desc: 0, ordering: 'id'})//квери параметр сортировки
    const [isValid, setIsValid] = useState(true) // чек на валидность выбранной строки
    const [colSpan, setColSpan] = useState(columns.length + 1) // наличие дополнительной ячейки под экшен
    const [showInvalid, setShowInvalid] = useState(false); // когда тру фокус переходит на последнюю невалидную строку и сбразывается в фолс

    const {deleteRows, editing, ...otherData} = useData({
        handbookName,
        filterParams,
        sortParams,
        selectedRows,
        snackbarHandler,
        setDefaultCurrentMod,
        setErrMessage
    })

    // сброс на дефолтные значения
    useEffect(() => {
        setHandbook(match.params.name);
        setColumns(handbooks[handbookName].columns);
        setDefaultCurrentMod();
        setActiveFilter(false);
        setFilterParams({});
    }, [match, handbookName])

    useEffect(() => {
        if (selectedRows.length === 0) setIsValid(true);
    }, [selectedRows.length])

    useEffect(() => setIsValid(true),
        [currentMod])

    useEffect(() => {
        editing ? setColSpan(columns.length + 1) : setColSpan(columns.length)
    }, [editing, handbookName, columns])

    useEffect(() => {
        if (!activeFilter) {
            setFilterParams(prev => Object.keys(prev).length === 0 ? prev : {})
        }
    }, [activeFilter])

    function changeModHandler(newMod) {
        checkValid(() => {
            setSelectedRows([])
            newMod === currentMod ?
                setCurrentMod('update') :
                setCurrentMod(newMod)
        })
    }

    const closeErrMessageHandler = useCallback(() => {
        setErrMessage('')
    }, [])

    const focusInvalid = useCallback(() => {
        setInvalidSnackbar(true)
        setShowInvalid(true)
    }, []);

    function setDefaultCurrentMod(rest = true) {
        setCurrentMod('update');
        if (rest) setSelectedRows([])
    }

    function checkValid(callback) {
        return isValid ? callback() : focusInvalid()
    }

    function snackbarHandler({error = false, mess = ''}) {
        setSnackbar(true);
        setSnackbarMess(mess);
    }

    function sortParamsHandler(accessor) {
        if (selectedRows.length > 0) return
        if (sortParams.ordering !== accessor) return setSortParams({
            ordering: accessor,
            desc: 0
        })
        setSortParams({
            ordering: accessor,
            desc: sortParams.desc === 0 ? 1 : 0
        })
    }

    function filterParamsHandler(accessor, value) {
        setFilterParams(prev => ({
            ...prev,
            [accessor]: value
        }))
    }

    return (
        <ModContext.Provider value={{
            currentMod,
            checkValid,
            setCurrentMod,
            selectedRows,
            setSelectedRows,
            isValid,
            setIsValid,
            setDefaultCurrentMod,
            showInvalid,
            setShowInvalid,
            colSpan,
            editing,
        }
        }>
            <Box className={classes.root}>
                <ModalMessage open={!!errMessage} message={errMessage} close={closeErrMessageHandler}/>
                <Feedback
                    openSnackbar={invalidSnackbar || openSnackbar}
                    snackbarCloseHandler={() => {
                        setSnackbar(false);
                        setInvalidSnackbar(false)
                    }}
                    snackbarMess={openSnackbar ? snackbarMess : INTERFACE_DIALOG.invalidRequiredField[lang]}
                    success={openSnackbar}/>

                <SideMenu
                    currentMod={currentMod}
                    changeModHandler={changeModHandler}/>
                <Box component={Paper} elevation={3}
                     style={{display: 'flex', flexFlow: 'column', maxHeight: '100%', overflow: 'hidden'}}>
                    {/*Шапка над таблицей*/}
                    <ToolbarHeader
                        handbookName={handbooks[handbookName].name[lang]}
                        deleteMod={selectedRows.length > 0 && currentMod === 'delete'}
                        selected={selectedRows.length}
                        filterToggleHandler={() => setActiveFilter(!activeFilter)}
                        activeFilterMod={activeFilter}
                        cancelButtonHandler={setDefaultCurrentMod}
                        deleteButtonHandler={deleteRows}
                    />
                    <TableContainer style={{maxWidth: handbooks[handbookName].maxWidth}}>
                        <Table style={{tableLayout: 'fixed'}} stickyHeader>
                            <HeadTable
                                activeFilter={activeFilter}
                                columns={columns}
                                sortParams={sortParams}
                                sortParamsHandler={sortParamsHandler}
                                filterParamsHandler={filterParamsHandler}/>
                            <BodyTable
                                handbookName={handbookName}
                                {...otherData}
                                columns={columns}
                                filterParams={filterParams}
                                sortParams={sortParams}
                                setErrMessage={setErrMessage}
                                snackbarHandler={snackbarHandler}
                            />
                        </Table>
                    </TableContainer>
                </Box>

            </Box>
        </ModContext.Provider>

    )
}