import OneElementActsForm from '../../components/OneElement/ActsFormOneElement';
import * as objects from './objectStructure';
import {TYPE} from '../../util/constant';
import {
    setBreak,
    setAccessor,
    setType,
    setValidation,
    setOrdering,
    setHeader,
    setSubPath
} from '../../util/constructorFunction';
import {setLanguages} from '../../util/language';
import {handbooks} from '../handbookStructure/handbook';

export const FORM_NAME = 'acts';

export const ACCESSORS = {
    ACT_DATE: 'actdate',
    ACT_NUMBER: 'actnumber',
    ACT_TYPE: 'acttype',
    ID: 'id',
    OBJECT: 'object',
};

export const str = {
    [ACCESSORS.ACT_DATE]: {
        ...setHeader('Дата'),
        ...setAccessor(ACCESSORS.ACT_DATE, 150),
        ...setType(TYPE.DATE, true),
        ...setOrdering(),
        ...setValidation('0000{-}00{-}00', /\d{4}-\d{2}-\d{2}/),
    },
    [ACCESSORS.ACT_NUMBER]: {
        ...setHeader('Номер'),
        ...setAccessor(ACCESSORS.ACT_NUMBER, 150),
        ...setType(TYPE.STRING, true),
        ...setOrdering(true, true),
        ...setValidation(/.{0,20}/, /.+/),
    },
    [ACCESSORS.ACT_TYPE]: {
        ...setHeader('Тип'),
        ...setAccessor(ACCESSORS.ACT_TYPE, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(),
        ...setSubPath(() => handbooks.acttypes, 'acttypename'),
        ...setValidation(),
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
        ...setSubPath(() => objects.structureTable, 'objectname'),
        ...setValidation(),
    },
};

export const structureTable = {
    name: setLanguages('Акты', '', ''),
    maxWidth: '900px',
    formName: FORM_NAME,
    oneElementComponent:OneElementActsForm,
    columns: [
        {...str[ACCESSORS.ID]},
        {...str[ACCESSORS.ACT_DATE]},
        {...str[ACCESSORS.OBJECT]},
        {...str[ACCESSORS.ACT_NUMBER]},
        {...str[ACCESSORS.ACT_TYPE]},
    ],
};

export const structureTableForObjects = {
    name: setLanguages('', '', ''),
    maxWidth: '900px',
    formName: FORM_NAME,
    noDeleteButton: true,
    oneElementComponent: OneElementActsForm,
    columns: [{...str[ACCESSORS.ACT_DATE]}, {...str[ACCESSORS.ACT_NUMBER]}, {...str[ACCESSORS.ACT_TYPE]}],
};
