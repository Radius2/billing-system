import {TYPE} from '../util/constant'
import {
    setBreak,
    setAccessor,
    setType,
    setValidation,
    setOrdering,
    setHeader,
    setSubPath
} from '../util/constructorFunction'
import {setLanguages} from '../../../util/language';
import * as objects from './objectStructure';
import * as contracts from './contractStructure';

const FORM_NAME = 'objcontracts'

const BR = setBreak();

const ACCESSORS = {
    CONTRACT:'contract',
    END_DATE:'enddate',
    ID: 'id',
    OBJECT:'object',
    START_DATE: 'startdate',
}

export const str = {

    [ACCESSORS.CONTRACT]: {
        ...setHeader('Номер договора'),
        ...setAccessor(ACCESSORS.CONTRACT, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath(contracts.FORM_NAME, contracts.ACCESSORS.CONTRACT_NUMBER),
        ...setValidation()
    },
    [ACCESSORS.END_DATE]: {
        ...setHeader('Дата закрытия'),
        ...setAccessor(ACCESSORS.END_DATE, 150),
        ...setType(TYPE.DATE, true),
        ...setOrdering(true, true),
        ...setValidation('0000{-}00{-}00', /\d{4}-\d{2}-\d{2}/)
    },
    [ACCESSORS.ID]: {
        ...setHeader('ID'),
        ...setAccessor(ACCESSORS.ID, 70),
        ...setType(TYPE.ID, true),
        ...setOrdering(true, true),
        ...setValidation()
    },
    [ACCESSORS.OBJECT]: {
        ...setHeader('Точка подключения'),
        ...setAccessor(ACCESSORS.OBJECT, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath(objects.FORM_NAME, objects.ACCESSORS.OBJECT_NAME),
        ...setValidation()
    },
    [ACCESSORS.START_DATE]: {
        ...setHeader('Дата открытия'),
        ...setAccessor(ACCESSORS.START_DATE, 150),
        ...setType(TYPE.DATE, true),
        ...setOrdering(true, true),
        ...setValidation('0000{-}00{-}00', /\d{4}-\d{2}-\d{2}/)
    },

}

export const structureTable = {
    header: setLanguages('Точки подключения', '', ''),
    maxWidth: '900px',
    formName: FORM_NAME,
    columns: [
        {...str[ACCESSORS.ID]},{...BR},
        {...str[ACCESSORS.OBJECT]},{...BR},
        {...str[ACCESSORS.CONTRACT]},{...BR},
        {...str[ACCESSORS.START_DATE]},{...BR},

    ],
    mainValues: {
        parameters: [
            {...str[ACCESSORS.ID]},{...BR},
            {...str[ACCESSORS.OBJECT]},{...BR},
            {...str[ACCESSORS.CONTRACT]},{...BR},
            {...str[ACCESSORS.START_DATE]},{...BR},
        ]
    },
}