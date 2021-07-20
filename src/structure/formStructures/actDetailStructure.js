import ActDetailsFormOneElement from '../../components/OneElement/ActDetailsFormOneElement';
import {handbooks} from '../handbookStructure/handbook';
import * as acts from './actStructure';
import { TYPE } from '../../util/constant';
import {
  setBreak,
  setAccessor,
  setType,
  setValidation,
  setOrdering,
  setHeader,
  setSubPath,
  setSubSubPath
} from '../../util/constructorFunction';
import { setLanguages } from '../../util/language';

export const FORM_NAME = 'actdetails';

const BR = setBreak();

export const ACCESSORS = {
  ACT: 'act',
  CHECK_INTERVAL: 'checkinterval',
  ID: 'id',
  INITIAL_VALUES: 'initialvalue',
  INSTALL_DATE: 'installdate',
  PU: 'pu',
  PU_NUMBER: 'punumber',
  PU_TYPE: 'putype',
  SEAL_NUMBER: 'sealnumber',
};

export const str = {
 [ACCESSORS.ACT]:{
   ...setHeader('Номер акта'),
   ...setAccessor(ACCESSORS.ACT, 200),
   ...setType(TYPE.SUB_VALUE, true),
   ...setOrdering(true, true),
   ...setSubPath(() => acts.structureTable, acts.ACCESSORS.ACT_NUMBER),
   ...setValidation(),
 },
  [ACCESSORS.CHECK_INTERVAL]: {
    ...setHeader('Межповерочный интервал, лет'),
    ...setAccessor(ACCESSORS.CHECK_INTERVAL, 200),
    ...setType(TYPE.NUMBER, true),
    ...setOrdering(),
    ...setValidation(/^\d{0,2}$/,/^\d+$/),
  },
  [ACCESSORS.ID]: {
    ...setHeader('ID'),
    ...setAccessor(ACCESSORS.ID, 70),
    ...setType(TYPE.ID, true),
    ...setOrdering(true, true),
    ...setValidation(),
  },
  [ACCESSORS.INITIAL_VALUES]: {
    ...setHeader('Начальные значения'),
    ...setAccessor(ACCESSORS.INITIAL_VALUES, 200),
    ...setType(TYPE.NUMBER, true),
    ...setOrdering(),
    ...setValidation(/^\d{0,12}$/,/^\d+$/),
  },
  [ACCESSORS.INSTALL_DATE]: {
    ...setHeader('Дата установки'),
    ...setAccessor(ACCESSORS.INSTALL_DATE, 200),
    ...setType(TYPE.DATE, true),
    ...setOrdering(false,true),
    ...setValidation(/.+/, /\d{4}-\d{2}-\d{2}/),
  },
  [ACCESSORS.PU]:{
    ...setHeader('Номер акта'),
    ...setAccessor(ACCESSORS.PU, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(true, true),
    ...setSubPath(() => handbooks.pu, 'puname'),
    ...setValidation(),
  },
  [ACCESSORS.PU_NUMBER]: {
    ...setHeader('Начальные значения'),
    ...setAccessor(ACCESSORS.PU_NUMBER, 200),
    ...setType(TYPE.NUMBER, true),
    ...setOrdering(),
    ...setValidation(/^\d{0,10}$/,/^\d+$/),
  },
  [ACCESSORS.PU_TYPE]:{
    ...setHeader('Тип прибора учета'),
    ...setAccessor(ACCESSORS.PU_TYPE, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(),
    ...setSubPath(() => handbooks.putypes, 'putypename'),
    ...setValidation(),
  },
  [ACCESSORS.SEAL_NUMBER]: {
    ...setHeader('Номер пломбы'),
    ...setAccessor(ACCESSORS.SEAL_NUMBER, 200),
    ...setType(TYPE.NUMBER, true),
    ...setOrdering(),
    ...setValidation(/^\d{0,10}$/,/^\d+/),
  },
};

export const structureTable = {
  name: setLanguages('Детали актов', '', ''),
  oneElementComponent: props => ActDetailsFormOneElement({ str: str, ...props }),
  maxWidth: '900px',
  noDeleteButton: true,
  formName: FORM_NAME,
  columns: [
    { ...str[ACCESSORS.ID] },
    { ...str[ACCESSORS.ACT] },
    { ...str[ACCESSORS.PU_NUMBER] },
  ],
};
