import { handbooks } from '../handbookStructure/handbook';
import ObjectFormOneElement from '../../components/OneElement/ObjectFormOneElement';
import { TYPE } from '../../util/constant';
import { setBreak, setAccessor, setType, setValidation, setOrdering, setHeader, setSubPath } from '../../util/constructorFunction';
import { setLanguages } from '../../util/language';

export const FORM_NAME = 'objects';

const BR = setBreak();

export const ACCESSORS = {
  FLAT_NUMBER: 'flatnumber',
  HOUSE: 'house',
  ID: 'id',
  OBJECT_NAME: 'objectname',
  OBJECT_TYPE: 'objtype',
  REG_QTY: 'regqty',
  TARIFF_GROUP: 'tariffgroup',
  UZO: 'uzo',
};

export const str = {
  [ACCESSORS.FLAT_NUMBER]: {
    ...setHeader('Номер квартиры'),
    ...setAccessor(ACCESSORS.FLAT_NUMBER, 200),
    ...setType(TYPE.STRING, true),
    ...setValidation(/.{1,20}/, /.+/),
  },
  [ACCESSORS.HOUSE]: {
    ...setHeader('Дом'),
    ...setAccessor(ACCESSORS.HOUSE, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(true, true),
    ...setSubPath(() => handbooks.houses, 'housenumber'),
    ...setValidation(),
  },
  [ACCESSORS.ID]: {
    ...setHeader('ID'),
    ...setAccessor(ACCESSORS.ID, 70),
    ...setType(TYPE.ID, true),
    ...setOrdering(false, true),
    ...setValidation(),
  },
  [ACCESSORS.OBJECT_NAME]: {
    ...setHeader('Наименование'),
    ...setAccessor(ACCESSORS.OBJECT_NAME, 200),
    ...setType(TYPE.STRING, true),
    ...setOrdering(true, true),
    ...setValidation(/.{0,100}/, /.+/),
  },
  [ACCESSORS.OBJECT_TYPE]: {
    ...setHeader('Тип точки учета'),
    ...setAccessor(ACCESSORS.OBJECT_TYPE, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(),
    ...setSubPath(() => handbooks.objtypes, 'objtypename'),
    ...setValidation(/.{0,100}/, /.+/),
  },
  [ACCESSORS.REG_QTY]: {
    ...setHeader('Количество проживающих'),
    ...setAccessor(ACCESSORS.REG_QTY, 200),
    ...setType(TYPE.NUMBER, true),
    ...setValidation(/^\d{0,2}$/, /\d+/),
  },
  [ACCESSORS.TARIFF_GROUP]: {
    ...setHeader('Группа тарифов'),
    ...setAccessor(ACCESSORS.TARIFF_GROUP, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setSubPath(() => handbooks.tariffgroups, 'tariffgroupname'),
    ...setValidation(),
  },
  [ACCESSORS.UZO]: {
    ...setHeader('УЗО'),
    ...setAccessor(ACCESSORS.UZO, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setSubPath(() => handbooks.uzo, 'uzoname'),
    ...setValidation(),
  },
};

export const structureTable = {
  name: setLanguages('Точки учета', '', ''),
  maxWidth: '1000px',
  formName: FORM_NAME,
  oneElementComponent: props => ObjectFormOneElement({ str: str, ...props }),
  columns: [
    { ...str[ACCESSORS.ID] },
    { ...str[ACCESSORS.OBJECT_NAME] },
    { ...str[ACCESSORS.OBJECT_TYPE] },
    { ...str[ACCESSORS.REG_QTY] },
    { ...str[ACCESSORS.TARIFF_GROUP] },
  ],
  mainValues: {
    parameters: [
      { ...str[ACCESSORS.OBJECT_NAME] },
      { ...BR },
      { ...str[ACCESSORS.OBJECT_TYPE] },
      { ...BR },
      { ...str[ACCESSORS.REG_QTY] },
      { ...BR },
      { ...str[ACCESSORS.TARIFF_GROUP] },
      { ...BR },
      { ...str[ACCESSORS.FLAT_NUMBER] },
      { ...BR },
      { ...str[ACCESSORS.HOUSE] },
      { ...BR },
      { ...str[ACCESSORS.UZO] },
      { ...BR },
    ],
  },
};
