import { handbooks } from '../handbookStructure/handbook';
import ContractFormOneElement from '../../components/OneElement/ContractFormOneElement';
import { TYPE } from '../../util/constant';
import { setBreak, setAccessor, setType, setValidation, setOrdering, setHeader, setSubPath } from '../../util/constructorFunction';
import { setLanguages } from '../../util/language';
import * as subjects from './subjectStructure'

export const FORM_NAME = 'contracts';

export const ACCESSORS = {
  AREA: 'area',
  BARCODE: 'barcode',
  CONSIGNEE: 'consignee',
  CONTRACT_NUMBER: 'contractnumber',
  CUSTOMER: 'customer',
  CUSTOMER_GROUP: 'customergroup',
  END_DATE: 'enddate',
  ESO: 'eso',
  ESO_CONTRACT_NUMBER: 'esocontractnumber',
  ID: 'id',
  PERSONAL_ACCOUNT: 'personalaccount',
  START_DATE: 'startdate',
};

export const str = {
  [ACCESSORS.AREA]: {
    ...setHeader('Cетевой участок'),
    ...setAccessor(ACCESSORS.AREA, 350),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(),
    ...setSubPath(() => handbooks.areas, 'areaname'),
    ...setValidation(),
  },
  [ACCESSORS.BARCODE]: {
    ...setHeader('Штрихкод'),
    ...setAccessor(ACCESSORS.BARCODE, 350),
    ...setType(TYPE.STRING, true),
    ...setValidation(),
  },
  [ACCESSORS.CONSIGNEE]: {
    ...setHeader('Грузополучатель'),
    ...setAccessor(ACCESSORS.CONSIGNEE, 350, true),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(),
    ...setSubPath(() => subjects.structureTable, 'subname'),
    ...setValidation(/^.{0,20}$/, /^.+$/),
  },
  [ACCESSORS.CONTRACT_NUMBER]: {
    ...setHeader('Номер договора'),
    ...setAccessor(ACCESSORS.CONTRACT_NUMBER, 200),
    ...setType(TYPE.STRING, true),
    ...setOrdering(true, true),
    ...setValidation(/^.{0,20}$/, /^.+$/),
  },
  [ACCESSORS.CUSTOMER]: {
    ...setHeader('Субъект'),
    ...setAccessor(ACCESSORS.CUSTOMER, 250, true),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(false, false),
    ...setSubPath(() => subjects.structureTable, 'subname'),
    ...setValidation(),
  },
  [ACCESSORS.CUSTOMER_GROUP]: {
    ...setHeader('Группа потребления'),
    ...setAccessor(ACCESSORS.CUSTOMER_GROUP, 350),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(),
    ...setSubPath(() => handbooks.customergroups, 'customergroupname'),
    ...setValidation(),
  },
  [ACCESSORS.END_DATE]: {
    ...setHeader('Дата закрытия'),
    ...setAccessor(ACCESSORS.END_DATE, 150),
    ...setType(TYPE.DATE, true),
    ...setOrdering(),
    ...setValidation('0000{-}00{-}00', false),
    noEditing:true,
  },
  [ACCESSORS.ESO]: {
    ...setHeader('ЭСО'),
    ...setAccessor(ACCESSORS.ESO, 350, true),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(),
    ...setSubPath(() => handbooks.eso, 'esoname'),
    ...setValidation(),
  },
  [ACCESSORS.ESO_CONTRACT_NUMBER]: {
    ...setHeader('Договор с ЭСО'),
    ...setAccessor(ACCESSORS.ESO_CONTRACT_NUMBER, 350),
    ...setType(TYPE.STRING, true),
    ...setOrdering(),
    ...setValidation(/^.{0,20}$/, /^.+$/),
  },
  [ACCESSORS.ID]: {
    ...setHeader('ID'),
    ...setAccessor(ACCESSORS.ID, 70),
    ...setType(TYPE.ID, true),
    ...setOrdering(false, true),
    ...setValidation(),
  },
  [ACCESSORS.PERSONAL_ACCOUNT]: {
    ...setHeader('Расчетный счет'),
    ...setAccessor(ACCESSORS.PERSONAL_ACCOUNT, 350),
    ...setType(TYPE.NUMBER, true),
    ...setOrdering(),
    ...setValidation(/^\d{0,20}$/, /.+/),
  },
  [ACCESSORS.START_DATE]: {
    ...setHeader('Дата открытия'),
    ...setAccessor(ACCESSORS.START_DATE, 150),
    ...setType(TYPE.DATE, true),
    ...setOrdering(false, true),
    ...setValidation(/.+/, /\d{4}-\d{2}-\d{2}/),
  },
};

export const structureTable = {
  name: setLanguages('Договоры', '', ''),
  maxWidth: '900px',
  noDeleteButton: true,
  oneElementComponent: ContractFormOneElement,
  formName: FORM_NAME,
  columns: [
    { ...str[ACCESSORS.ID] },
    { ...str[ACCESSORS.CONTRACT_NUMBER] },
    { ...str[ACCESSORS.CUSTOMER] },
    { ...str[ACCESSORS.START_DATE] },
    { ...str[ACCESSORS.END_DATE] },
  ],
};

export const structureTableForSubjects ={
  ...structureTable,
  filterAccessor: 'actualdate',
  typeFilterAccessor: 'date',
  filterAccessorLabel: setLanguages('Показать актуальные на'),
  columns: [
    { ...str[ACCESSORS.ID] },
    { ...str[ACCESSORS.CONTRACT_NUMBER] },
    { ...str[ACCESSORS.START_DATE] },
    { ...str[ACCESSORS.END_DATE] },
  ],
}
