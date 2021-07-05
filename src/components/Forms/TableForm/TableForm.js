import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    Box,
    Paper,
    TableContainer,
    Table,
    TableBody,
    IconButton,
    Tooltip,
    Typography, Toolbar
} from '@material-ui/core';
import InfiniteScrollBorder from '../../Handbook/InfiniteScrollBorder';
import LoadingRow from '../../Handbook/LoadingRow';
import Row from './Row'
import HeadTable from '../../Handbook/HeadTable';
import ModalMessage from '../../Modal';
import TooltipButton from '../../Handbook/TooltipButton';
import {LanguageContext} from '../../../App';
import {INTERFACE_LANGUAGE} from '../../../util/language';
import useStyle from './style';
import useTableData from './useTableData';

function getColSpan(columns) {
    return columns.length
}

export default function TableForm({formStructure, clickRowHandler, preparedFilter, OneElementComponent}) {
    const {columns, formName} = formStructure
    const classes = useStyle();
    const {lang} = useContext(LanguageContext)
    const [errMessage, setErrMessage] = useState(''); //сообщение об ошибке
    const [colSpan, setColSpan] = useState(getColSpan(columns)) // наличие дополнительного столбца под экшен
    const [openOneElement, setOpenOneElement] = useState(false)
    const [openModalProps, setOpenModalProps] = useState({
        subValue: {formName: formName, id: 'add'},
        submitHandler: () => console.log('done')
    })
    const {
        data,
        loading,
        editing,
        getMore,
        sortParams,
        sortParamsHandler,
        filterParamsHandler,
        activeFilter,
        setActiveFilter,
        setReloadData,
        showInfinityScrollRow,
    } = useTableData({formName, setErrMessage})

    useEffect(() => {
        if (!preparedFilter) return undefined
        filterParamsHandler(preparedFilter.accessor, preparedFilter.id)
    }, [preparedFilter])

    useEffect(() => {
        setColSpan(getColSpan(columns))
    }, [columns])


    const closeErrMessageHandler = useCallback(() => {
        setErrMessage('')
    }, [])

    function openOneElementHandler(id, submitHandler = () => {
        setOpenOneElement(false);
        setReloadData(true)
    }) {
        setOpenModalProps(() => ({
            id: id.toString(),
            submitHandler
        }))
        setOpenOneElement(true)

    }

    return (
        <Box className={classes.root} style={{minWidth: 'content'}}>

            {openOneElement ?
                <OneElementComponent
                    open={openOneElement}
                    {...openModalProps}
                    cancelHandler={() => setOpenOneElement(false)}
                /> : null}

            <ModalMessage open={!!errMessage} message={errMessage} close={closeErrMessageHandler}/>

            {editing ?
                <Box className={classes.sidemenu} component={Paper} elevation={2}>

                    <TooltipButton
                        tooltipTitle={INTERFACE_LANGUAGE.add[lang]}
                        actionHandler={() => {
                            openOneElementHandler('Add')
                        }}
                        icon={<AddIcon fontSize='default'/>}
                    />
                </Box>
                : null}

            <Box component={Paper} elevation={3}
                 style={{display: 'flex', flexFlow: 'column', height: '100%', overflow: 'hidden'}}>
                {/*Шапка над таблицей*/}
                <Toolbar
                    className={classes.toolbar}>
                    <Typography
                        variant='h6'>
                        {formStructure.header[lang]}
                    </Typography>
                    <Tooltip title={INTERFACE_LANGUAGE.filter[lang]}>
                        <IconButton onClick={()=>setActiveFilter(!activeFilter)} aria-label="filter list">
                            <FilterListIcon
                                color={activeFilter ? 'primary' : 'inherit'}/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <TableContainer
                    style={{maxWidth: formStructure.maxWidth, height: '100%', overflow: 'scroll'}}>
                    <Table style={{tableLayout: 'fixed'}} stickyHeader>
                        <HeadTable
                            activeFilter={activeFilter}
                            columns={columns}
                            sortParams={sortParams}
                            sortParamsHandler={sortParamsHandler}
                            filterParamsHandler={filterParamsHandler}
                        />

                        <TableBody>
                            {data.map((dataRow, index) => {
                                return (<Row
                                    key={dataRow?.id ?? '' + index}
                                    clickRowHandler={clickRowHandler ? () => clickRowHandler(dataRow) : () => openOneElementHandler(dataRow.id)}
                                    columns={columns}
                                    data={dataRow}
                                >
                                </Row>)
                            })}
                            {loading ?
                                <LoadingRow colSpan={colSpan}/>
                                : null}
                            {showInfinityScrollRow ?
                                <InfiniteScrollBorder
                                    loading={loading}
                                    colSpan={colSpan}
                                    uploadMoreFunction={getMore}/>
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>

    )
}