import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import useStyle from '../../Handbook/style';
import {LanguageContext} from '../../../App';
import {electricityBalances} from '../ElectricityBalances/util/electricityBalancesForms';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {INTERFACE_DIALOG, INTERFACE_LANGUAGE} from '../../../util/language';
import AddIcon from '@material-ui/icons/Add';
import {Box, Checkbox, Paper, Table, TableBody, TableContainer} from '@material-ui/core';
import OneElement from '../../Handbook/OneElement/OneElement';
import ModalMessage from '../../Modal';
import Feedback from '../../Handbook/Feedback';
import TooltipButton from '../../Handbook/TooltipButton';
import ToolbarHeader from '../../Handbook/ToolbarHeader';
import HeadTable from '../../Handbook/HeadTable';
import Row from '../../Handbook/Row';
import CreateIcon from '@material-ui/icons/Create';
import LoadingRow from '../../Handbook/LoadingRow';
import InfiniteScrollBorder from '../../Handbook/InfiniteScrollBorder';
import useDocumentsData from '../hooks/useDocumentsData';
import RegistrationAnAccountingPoint from '../ElectricityBalances/components/RegistrationAnAccountingPoint/RegistrationAnAccountingPoint';

function getColSpan(columns) {
  return columns.reduce((acc, curr) => acc + Number(curr.mainValue), 0);
}


export default function DocumentsList({match, document, clickRowHandler}) {

  const classes = useStyle();
  const {lang} = useContext(LanguageContext);
  const [documentName, setDocumentName] = useState(document || match.params.name); // название формы
  const [columns, setColumns] = useState(electricityBalances[documentName].columns); //шапка формы
  const [errMessage, setErrMessage] = useState(''); //сообщение об ошибке
  const [openSnackbar, setSnackbar] = useState(false); //выплывающее окно о успешной операции
  const [snackbarMess, setSnackbarMess] = useState('');//сообщение
  const [selectedRows, setSelectedRows] = useState([]); // выбранная строка для редактирования
  const [currentMod, setCurrentMod] = useState('update'); // текущий режим изменения, удаление, добавление
  const [colSpan, setColSpan] = useState(getColSpan(columns) + 1); // наличие дополнительного столбца под экшен
  const [openOneElement, setOpenOneElement] = useState(false); // наличие дополнительной ячейки под экшен
  const [openModalProps, setOpenModalProps] = useState({
    subValue: {documentName, id: 'add'},
    submitHandler: () => console.log('done'),
  });


  const components = {
    'registration_an_accounting_point': <RegistrationAnAccountingPoint openModal={true} setOpenOneElement={setOpenOneElement}/>
  }


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
  } = useDocumentsData({documentName, selectedRows, snackbarHandler, setDefaultCurrentMod, setErrMessage});


  // сброс на дефолтные значения
  useEffect(() => {
    setDocumentName(document || match.params.name);
    setColumns(electricityBalances[documentName].columns);
    setDefaultCurrentMod();
  }, [match, document, documentName]);

  useEffect(() => {
    editing ? setColSpan(getColSpan(columns) + 1) : getColSpan(columns);
  }, [editing, documentName, columns]);


  const closeErrMessageHandler = useCallback(() => {
    setErrMessage('');
  }, []);

  const iconButton = useMemo(() => [
        {
          name: 'delete',
          icon: <DeleteForeverIcon fontSize='default'/>,
          tooltipTitle: INTERFACE_LANGUAGE.delete[lang],
          action: () => {
            setCurrentMod(currentMod === 'delete' ? 'update' : 'delete');
          },
        },
        {
          name: 'add',
          icon: <AddIcon fontSize='default'/>,
          tooltipTitle: INTERFACE_LANGUAGE.add[lang],
          action: () => {
            openOneElementHandler('Add');
          },
        },
      ], [currentMod, lang],
  );

  function setDefaultCurrentMod(rest = true) {
    setCurrentMod('update');
    if (rest) {
      setSelectedRows([]);
    }
  }


  function snackbarHandler({error = false, mess = ''}) {
    setSnackbar(true);
    setSnackbarMess(mess);
  }

  function openOneElementHandler(id, submitHandler = () => {
    setOpenOneElement(false);
    setReloadData(true);
  }) {
    setOpenModalProps({
      subValue: {
        documentName: documentName,
        id: id.toString(),
      },
      submitHandler,
    });
    setOpenOneElement(true);

  }

  return (
      <Box className={classes.root} style={{minWidth: 'content'}}>
        {openOneElement ? components[documentName] : null}
        <ModalMessage open={!!errMessage} message={errMessage} close={closeErrMessageHandler}/>
        <Feedback
            openSnackbar={openSnackbar}
            snackbarCloseHandler={() => {
              setSnackbar(false);
            }}
            snackbarMess={openSnackbar ? snackbarMess : INTERFACE_DIALOG.invalidRequiredField[lang]}
            success={openSnackbar}/>

        {editing ?
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
        <Box component={Paper} elevation={3}
             style={{display: 'flex', flexFlow: 'column', height: '100%', overflow: 'hidden'}}>
          {/*Шапка над таблицей*/}
          <ToolbarHeader
              documentName={electricityBalances[documentName].name[lang]}
              deleteMod={selectedRows.length > 0 && currentMod === 'delete'}
              selected={selectedRows.length}
              filterToggleHandler={() => setActiveFilter(!activeFilter)}
              activeFilterMod={activeFilter}
              cancelButtonHandler={setDefaultCurrentMod}
              deleteButtonHandler={deleteRows}
          />
          <TableContainer
              style={{maxWidth: electricityBalances[documentName].maxWidth, height: '100%', overflow: 'scroll'}}>
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
                                    e.stopPropagation();
                                    if (prevState.includes(index)) {
                                      prevState.splice(prevState.indexOf(index), 1);
                                      return [...prevState];
                                    }
                                    return [...prevState, index];
                                  },
                              );
                            }}/>) : (
                        <TooltipButton
                            icon={<CreateIcon/>}
                            tooltipTitle={INTERFACE_LANGUAGE.update[lang]}
                            actionHandler={(e) => {
                              e.stopPropagation();
                              openOneElementHandler(dataRow.id);
                            }}/>)
                    }
                  </Row>);
                })}
                {loading ?
                    <LoadingRow colSpan={colSpan}/>
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
};
