import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Box, Paper, TableContainer, Table, TableBody, Checkbox} from '@material-ui/core';
import InfiniteScrollBorder from './InfiniteScrollBorder';
import LoadingRow from './LoadingRow';
import OneElement from './OneElement/OneElement';
import Row from './Row'
import HeadTable from './HeadTable';
import TooltipButton from './TooltipButton';
import ToolbarHeader from './ToolbarHeader';
import ModalMessage from '../Modal';
import Feedback from './Feedback'
import {LanguageContext} from '../../App';
import {handbooks} from '../../util/handbook';
import {INTERFACE_DIALOG, INTERFACE_LANGUAGE} from '../../util/language';
import useStyle from './style';
import useData from './useData';

function getColSpan(columns) {
    return columns.reduce((acc, curr) => acc + Number(curr.mainValue), 0)
}

export default function Handbook({match, handbook, clickRowHandler, preparedFilter, bindingVariant}) {
    const classes = useStyle();
    const {lang} = useContext(LanguageContext)
    const [handbookName, setHandbook] = useState(handbook || match.params.name); // название формы
    const [columns, setColumns] = useState(handbooks[handbookName].columns); //шапка формы
    const [errMessage, setErrMessage] = useState(''); //сообщение об ошибке
    const [openSnackbar, setSnackbar] = useState(false); //выплывающее окно о успешной опперации
    const [snackbarMess, setSnackbarMess] = useState('');//сообщение
    const [selectedRows, setSelectedRows] = useState([]); // выбранная строка для редактирования
    const [currentMod, setCurrentMod] = useState('update'); // текущий режим изменения, удаление, добавление
    const [colSpan, setColSpan] = useState(getColSpan(columns) + 1) // наличие дополнительного столбца под экшен
    const [openOneElement, setOpenOneElement] = useState(false) // наличие дополнительной ячейки под экшен
    const [openModalProps, setOpenModalProps] = useState({
        subValue: {handbookName: handbookName, id: 'add'},
        submitHandler: () => console.log('done')
    })
    const {
        loading,
        deleteRows,
        data,
        showInfinityScrollRow,
        editing,
        getMore,
        sortParams,
        sortParamsHandler,
        filterParamsHandler,
        activeFilter,
        setActiveFilter,
        setReloadData,
    } = useData({handbookName, selectedRows, snackbarHandler, setDefaultCurrentMod, setErrMessage})

    useEffect(() => {
        if (!preparedFilter) return undefined
        filterParamsHandler(preparedFilter.accessor, preparedFilter.id)
    }, [preparedFilter])

    // сброс на дефолтные значения
    useEffect(() => {
        setHandbook(handbook || match.params.name);
        setColumns(handbooks[handbookName].columns);
        setDefaultCurrentMod();
    }, [match, handbook, handbookName])

    useEffect(() => {
        editing ? setColSpan(getColSpan(columns) + 1) : getColSpan(columns)
    }, [editing, handbookName, columns])

    useEffect(() => {
        if (bindingVariant) setCurrentMod('delete')
    }, [bindingVariant])


    const closeErrMessageHandler = useCallback(() => {
        setErrMessage('')
    }, [])

    const iconButton = useMemo(() => [
            {
                name: 'delete',
                icon: <DeleteForeverIcon fontSize='default'/>,
                tooltipTitle: INTERFACE_LANGUAGE.delete[lang],
                action: () => {
                    setCurrentMod(currentMod === 'delete' ? 'update' : 'delete')
                }
            },
            {
                name: 'add',
                icon: <AddIcon fontSize='default'/>,
                tooltipTitle: INTERFACE_LANGUAGE.add[lang],
                action: () => {
                    openOneElementHandler('Add')
                },
            }
        ], [currentMod, lang]
    )

    function setDefaultCurrentMod(rest = true) {
        setCurrentMod('update');
        if (rest) setSelectedRows([])
    }


    function snackbarHandler({error = false, mess = ''}) {
        setSnackbar(true);
        setSnackbarMess(mess);
    }

    function openOneElementHandler(id, submitHandler, preparedValue = {}) {
        setOpenModalProps({
            subValue: {
                handbookName: handbookName,
                id: id.toString()
            },
            submitHandler: submitHandler ?? function () {
                setOpenOneElement(false);
                setReloadData(true)
            },
            preparedValue
        })
        setOpenOneElement(true)

    }

    return (
        <Box className={classes.root} style={{minWidth: 'content'}}>
            {openOneElement ? <OneElement
                open={openOneElement}
                {...openModalProps}
                cancelHandler={() => setOpenOneElement(false)}
            /> : null}
            <ModalMessage open={!!errMessage} message={errMessage} close={closeErrMessageHandler}/>
            <Feedback
                openSnackbar={openSnackbar}
                snackbarCloseHandler={() => {
                    setSnackbar(false);
                }}
                snackbarMess={openSnackbar ? snackbarMess : INTERFACE_DIALOG.invalidRequiredField[lang]}
                success={openSnackbar}/>

            {editing && !bindingVariant ?
                <Box className={classes.sidemenu} component={Paper} elevation={2}>
                    {
                        iconButton.map(button => (
                            <TooltipButton
                                key={button.name}
                                tooltipTitle={button.tooltipTitle}
                                actionHandler={button.action}
                                active={currentMod === button.name}
                                icon={button.icon}
                            />))
                    }
                </Box>
                : null}
            <Box component={Paper} elevation={bindingVariant ? 0 : 2}
                 style={{display: 'flex', flexFlow: 'column', maxHeight: '100%', height:'max-content', overflow: 'hidden'}}>
                {/*Шапка над таблицей*/}
                <ToolbarHeader
                    handbookName={handbooks[handbookName].name[lang]}
                    deleteMod={selectedRows.length > 0 && currentMod === 'delete'}
                    selected={selectedRows.length}
                    filterToggleHandler={() => setActiveFilter(!activeFilter)}
                    activeFilterMod={activeFilter}
                    cancelButtonHandler={setDefaultCurrentMod}
                    deleteButtonHandler={deleteRows}
                    bindingVariant={bindingVariant}
                    addHandler={() => openOneElementHandler('add', null, preparedFilter.preparedValue)}

                />
                <TableContainer
                    style={{
                        maxWidth: bindingVariant ? '100%' : handbooks[handbookName].maxWidth,
                        overflow: 'scroll'
                    }}>
                    <Table style={{tableLayout: 'fixed'}} stickyHeader>
                        <HeadTable
                            activeFilter={activeFilter}
                            columns={columns}
                            sortParams={sortParams}
                            sortParamsHandler={sortParamsHandler}
                            filterParamsHandler={filterParamsHandler}
                            editing={editing}
                        />

                        <TableBody>
                            {data.map((dataRow, index) => {
                                const selected = selectedRows.includes(index);
                                return (<Row
                                    key={dataRow?.id || index}
                                    clickRowHandler={clickRowHandler ? () => clickRowHandler(dataRow) : () => openOneElementHandler(dataRow.id)}
                                    columns={columns}
                                    data={dataRow}
                                    deleteClass={selected && currentMod === 'delete'}
                                >
                                    {currentMod === 'delete' ? (
                                        <Checkbox
                                            color='default'
                                            checked={selected}
                                            style={{padding: '3px'}}
                                            onClick={(e) => {
                                                setSelectedRows(prevState => {
                                                        e.stopPropagation()
                                                        if (prevState.includes(index)) {
                                                            prevState.splice(prevState.indexOf(index), 1)
                                                            return [...prevState]
                                                        }
                                                        return [...prevState, index]
                                                    }
                                                )
                                            }}/>) : (
                                        <TooltipButton
                                            icon={<CreateIcon/>}
                                            tooltipTitle={INTERFACE_LANGUAGE.update[lang]}
                                            actionHandler={(e) => {
                                                e.stopPropagation()
                                                openOneElementHandler(dataRow.id)
                                            }}/>)
                                    }
                                </Row>)
                            })}
                            {loading || data.length === 0 ?
                                <LoadingRow colSpan={colSpan} empty={data.length === 0 && !loading}/>
                                : null}
                            {showInfinityScrollRow ?
                                <InfiniteScrollBorder
                                    loading={loading} colSpan={colSpan}
                                    uploadMoreFunction={getMore}/>
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>

    )
}