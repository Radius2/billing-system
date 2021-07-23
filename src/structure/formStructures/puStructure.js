import PuOneElementForm from '../../components/OneElement/PuFormOneElement';
import * as objects from './objectStructure';
import { TYPE } from '../../util/constant';
import {
  setAccessor,
  setType,
  setValidation,
  setOrdering,
  setHeader,
  setSubPath,
} from '../../util/constructorFunction';
import { setLanguages } from '../../util/language';

export const FORM_NAME = 'pu';

export const ACCESSORS = {
  END_DATE: 'enddate',
  ID: 'id',
  OBJECT: 'object',
  START_DATE: 'startdate',
};

export const str = {

  [ACCESSORS.END_DATE]: {
    ...setHeader('Дата закрытия'),
    ...setAccessor(ACCESSORS.END_DATE, 150),
    ...setType(TYPE.DATE, true),
    ...setOrdering(),
    ...setValidation('0000{-}00{-}00', /\d{4}-\d{2}-\d{2}/),
  },
  [ACCESSORS.ID]: {
    ...setHeader('ID'),
    ...setAccessor(ACCESSORS.ID, 70),
    ...setType(TYPE.ID, true),
    ...setOrdering(false, true),
    ...setValidation(),
  },
  [ACCESSORS.OBJECT]: {
    ...setHeader('Точка учета'),
    ...setAccessor(ACCESSORS.OBJECT, 200),
    ...setType(TYPE.SUB_VALUE, true),
    ...setOrdering(true, true),
    ...setSubPath(() => objects.structureTable, 'objectname'),
    ...setValidation(),
  },
    [ACCESSORS.START_DATE]: {
    ...setHeader('Дата открытия'),
    ...setAccessor(ACCESSORS.START_DATE, 150),
    ...setType(TYPE.DATE, true),
    ...setOrdering(),
    ...setValidation('0000{-}00{-}00', /\d{4}-\d{2}-\d{2}/),
  },
};

export const structureTable = {
  name: setLanguages('Приборы учета', '', ''),
  formName: FORM_NAME,
  maxWidth: '900px',
  noDeleteButton: true,
  filterAccessor: 'actualdate',
  typeFilterAccessor: 'date',
  filterAccessorLabel: setLanguages('Показать актуальные на'),
  oneElementComponent: PuOneElementForm,
  columns: [
    { ...str[ACCESSORS.ID] },
    { ...str[ACCESSORS.START_DATE] },
    { ...str[ACCESSORS.END_DATE] },
  ],
};