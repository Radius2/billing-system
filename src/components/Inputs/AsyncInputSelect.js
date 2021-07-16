import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';
import * as api from '../../api/api';
import { TextField, Dialog } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Handbook from '../Handbook/Handbook';
import OneElement from '../Handbook/OneElement/OneElement';
import useStyle from './inputStyle';

const filter = createFilterOptions();

export default function AsyncInputSelect({
  width,
  onIsValidChange = () => {},
  onIsChangedChange = () => {},
  editing = true,
  value = {},
  label,
  subPath,
  onChange,
  filterParams = {},
  externalValue = {},
}) {
  const classes = useStyle({ width });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [openModalHandbook, setOpenModalHandbook] = useState(false);
  const [openModalOneElement, setOpenModalOneElement] = useState(false);
  const [preparedValue, setPreparedValue] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [initId] = useState(value?.id);

  useEffect(() => {
    setIsValid(value.id >= 0);
    setIsChanged(initId !== value.id);
  }, [value]);

  useEffect(() => {
    onIsChangedChange(isChanged);
  }, [isChanged]);

  useEffect(() => {
    onIsValidChange(isValid);
  }, [isValid]);

  const getOptions = useCallback(() => {
    api
      .getHandbook(subPath.structure().formName, {
        [subPath.accessor]: '%' + inputValue,
        page_size: 7,
        ...filterParams,
      })
      .then(({ data }) => {
        setOptions(data.values);
      })
      .catch(() => console.log('err'))
      .finally(() => setLoading(false));
  }, [inputValue, filterParams]);

  useEffect(() => {
    if (!isOpen) return undefined;
    setLoading(true);
    const timer = setTimeout(() => {
      getOptions();
    }, 500);
    return () => {
      setLoading(false);
      clearTimeout(timer);
    };
  }, [inputValue, isOpen]);

  function closeAutocompleteHandler() {
    setIsOpen(false);
    setOptions([]);
  }

  function modalCancelHandler() {
    setOpenModalHandbook(false);
    setOpenModalOneElement(false);
  }

  function modalSubmitHandler(data, elementData) {
    const newValue = { ...data, ...elementData };
    onChange(newValue);
    setOpenModalHandbook(false);
    setOpenModalOneElement(false);
  }

  const OneElementComponent = useMemo(() => subPath.structure().oneElementComponent || OneElement, [subPath]);

  return (
    <>
      {openModalHandbook ? (
        <Dialog maxWidth={false} PaperComponent='div' className={classes.root} open={openModalHandbook} onClose={modalCancelHandler}>
          <Box
            style={{
              display: 'flex',
              height: 'calc(100vh - 64px)',
              paddingBottom: '8px',
              justifyContent: 'center',
            }}>
            <Handbook structure={subPath.structure()} clickRowHandler={modalSubmitHandler} />
          </Box>
        </Dialog>
      ) : null}
      {openModalOneElement ? (
        <OneElementComponent
          open={openModalOneElement}
          cancelHandler={modalCancelHandler}
          submitHandler={modalSubmitHandler}
          structure={subPath.structure()}
          id='add'
          preparedValue={{ ...externalValue, ...preparedValue }}
        />
      ) : null}
      {editing ? (
        <Autocomplete
          className={classes.inputMui}
          options={options}
          value={value}
          inputValue={inputValue}
          noOptionsText='пусто'
          disableClearable
          getOptionSelected={(option, value) => option.id === value.id}
          onInputChange={(e, newInputValue) => setInputValue(newInputValue.toUpperCase())}
          onChange={(e, newValue) => {
            // if (typeof newValue === 'string') {
            //   setTimeout(() => {
            //     setPreparedValue({ [subPath.accessor]: newValue });
            //     setOpenModalOneElement(true);
            //   });
            // } else if (newValue && newValue.inputValue) {
            //   setPreparedValue({ [subPath.accessor]: newValue.inputValue });
            //   newValue.newWindow ? setOpenModalHandbook(true) : setOpenModalOneElement(true);
            // } else {
            if (newValue.newWindow) return setOpenModalHandbook(true);
            if (newValue.newElement) {
              setPreparedValue({ [subPath.accessor]: newValue.inputValue });
              return setOpenModalOneElement(true);
            }
            onChange(newValue);
            //}
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (true) {
              filtered.push(
                {
                  inputValue: params.inputValue,
                  [subPath.accessor]: `Создать "${params.inputValue}"`,
                  newElement: true,
                },
                {
                  inputValue: params.inputValue,
                  [subPath.accessor]: `Поиск в новом окне`,
                  newWindow: true,
                }
              );
            }
            return filtered;
          }}
          onOpen={() => setIsOpen(true)}
          onClose={closeAutocompleteHandler}
          getOptionLabel={option => option[subPath.accessor]?.toString().toUpperCase() || ''}
          renderInput={params => (
            <TextField
              {...params}
              InputLabelProps={{ shrink: true }}
              error={!isValid}
              disabled={!editing}
              label={label ?? ''}
              className={clsx(isChanged && isValid && classes.inputChanged)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress style={{ marginLeft: 'auto' }} color='inherit' size={18} /> : params.InputProps.endAdornment}
                    {}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      ) : (
        <TextField
          InputLabelProps={{ shrink: true }}
          disabled={!editing}
          label={label ?? ''}
          className={clsx(classes.inputMui, !editing && classes.inputDisabled)}
          value={value[subPath.accessor]}
        />
      )}
    </>
  );
}
