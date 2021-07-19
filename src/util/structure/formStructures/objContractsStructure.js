import OneElementObjContractForm from '../../../components/Handbook/OneElement/ObjContractFormOneElement';
import * as contracts from './contractStructure';
import * as objects from './objectStructure';
import { TYPE } from '../../constant';
import {
  setBreak,
  setAccessor,
  setType,
  setValidation,
  setOrdering,
  setHeader,
  setSubPath,
  setSubSubPath
} from '../../constructorFunction';
import { setLanguages } from '../../language';

export const FORM_NAME = 'objcontracts';

const BR = setBreak();

export const ACCESSORS = {
  CONTRACT: 'contract',
  CONTRACT_SUBJECT: 'contract_subject',
  CONTRACT_START_DATE: 'contract_start_date',
  END_DATE: 'enddate',
  ID: 'id',
  OBJECT: 'object',
  OBJECT_REGQTY: 'object_regqty',
  OBJECT_CITY: 'object_city',
  START_DATE: 'startdate',
};

export const str = {
  [ACCESSORS.CONTRACT]: {
    ...setHeader('Номер договора'),
    ...setAccessor(ACCESSORS.CONTRACT, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(true, true),
    ...setSubPath(() => contracts.structureTable, 'contractnumber'),
    ...setValidation(),
  },
  [ACCESSORS.CONTRACT_START_DATE]: {
    noEditing:true,
    ...setHeader('Дата начала'),
    ...setAccessor(ACCESSORS.CONTRACT, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(true, true),
    ...setSubPath(() => contracts.structureTable, 'startdate'),
    ...setValidation(),
  },

  [ACCESSORS.CONTRACT_SUBJECT]: {
    ...setHeader('Субъект'),
    ...setAccessor(ACCESSORS.CONTRACT, 200),
    ...setType(TYPE.SUB_SUB_VALUE, true),
    ...setOrdering(),
    ...setSubSubPath('customer', 'subname'),
    ...setValidation(),
  },

  [ACCESSORS.END_DATE]: {
    ...setHeader('Дата закрытия'),
    ...setAccessor(ACCESSORS.END_DATE, 150),
    ...setType(TYPE.DATE, true),
    ...setOrdering(true, true),
    ...setValidation('0000{-}00{-}00', /\d{4}-\d{2}-\d{2}/),
  },
  [ACCESSORS.ID]: {
    ...setHeader('ID'),
    ...setAccessor(ACCESSORS.ID, 70),
    ...setType(TYPE.ID, true),
    ...setOrdering(true, true),
    ...setValidation(),
  },
  [ACCESSORS.OBJECT]: {
    ...setHeader('Точка учета'),
    ...setAccessor(ACCESSORS.OBJECT, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(true, true),
    ...setSubPath(() => objects.structureTable, objects.ACCESSORS.OBJECT_NAME),
    ...setValidation(),
  },
  [ACCESSORS.OBJECT_REGQTY]: {
    noEditing:true,
    ...setHeader('Количество проживающих'),
    ...setAccessor(ACCESSORS.OBJECT, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(true, true),
    ...setSubPath(() => objects.structureTable, objects.ACCESSORS.REG_QTY),
    ...setValidation(),
  },
  [ACCESSORS.OBJECT_CITY]: {
    noEditing:true,
    ...setHeader('Город'),
    ...setAccessor(ACCESSORS.OBJECT, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(true, true),
    ...setSubSubPath('street', 'city'),
    ...setValidation(),
  },
  [ACCESSORS.OBJECT_CITY]: {
    noEditing:true,
    ...setHeader('Город'),
    ...setAccessor(ACCESSORS.OBJECT, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(true, true),
    ...setSubSubPath('street', 'city'),
    ...setValidation(),
  },
  [ACCESSORS.START_DATE]: {
    ...setHeader('Дата открытия'),
    ...setAccessor(ACCESSORS.START_DATE, 150),
    ...setType(TYPE.DATE, true),
    ...setOrdering(true, true),
    ...setValidation('0000{-}00{-}00', /\d{4}-\d{2}-\d{2}/),
  },
};

export const structureTable = {
  name: setLanguages('Точки подключения', '', ''),
  maxWidth: '900px',
  noDeleteButton: true,
  formName: FORM_NAME,
  oneElementComponent: props => OneElementObjContractForm({ str: str, ...props }),
  columns: [
    { ...str[ACCESSORS.ID] },
    { ...str[ACCESSORS.OBJECT] },
    { ...str[ACCESSORS.CONTRACT] },
    { ...str[ACCESSORS.START_DATE] },
    { ...str[ACCESSORS.END_DATE] },
  ],
};

export const structureTableForContracts = {
  name: setLanguages(''),
  formName: FORM_NAME,
  noDeleteButton: true,
  maxWidth: '400px',
  oneElementComponent: props => OneElementObjContractForm({ str: str, ...props }),
  columns: [{ ...str[ACCESSORS.OBJECT] }, { ...str[ACCESSORS.START_DATE] }, { ...str[ACCESSORS.END_DATE] }],
};
export const structureTableForObjects = {
  name: setLanguages(''),
  formName: FORM_NAME,
  noDeleteButton: true,
  maxWidth: '400px',
  oneElementComponent: props => OneElementObjContractForm({ str: str, ...props }),
  columns: [{ ...str[ACCESSORS.CONTRACT] }, { ...str[ACCESSORS.START_DATE] }, { ...str[ACCESSORS.END_DATE] }],
};
