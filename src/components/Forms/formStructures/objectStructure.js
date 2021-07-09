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

export const FORM_NAME = 'objects'

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
}

export const str = {
    [ACCESSORS.FLAT_NUMBER]: {
        ...setHeader('Номер квартиры'),
        ...setAccessor(ACCESSORS.FLAT_NUMBER, 200),
        ...setType(TYPE.STRING, true),
        ...setValidation(/.{1,20}/, /.+/)
    },
    [ACCESSORS.HOUSE]: {
        ...setHeader('Дом'),
        ...setAccessor(ACCESSORS.HOUSE, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('houses', 'housenumber'),
        ...setValidation()
    },
    [ACCESSORS.ID]: {
        ...setHeader('ID'),
        ...setAccessor(ACCESSORS.ID, 70),
        ...setType(TYPE.ID, true),
        ...setOrdering(true, true),
        ...setValidation()
    },
    [ACCESSORS.OBJECT_NAME]: {
        ...setHeader('Наименование'),
        ...setAccessor(ACCESSORS.OBJECT_NAME, 70),
        ...setType(TYPE.STRING, true),
        ...setOrdering(true, true),
        ...setValidation(/.{0,100}/, /.+/)
    },
    [ACCESSORS.OBJECT_TYPE]: {
        ...setHeader('Тип точки учета'),
        ...setAccessor(ACCESSORS.OBJECT_TYPE, 70),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('objtypes', 'objtypename'),
        ...setValidation(/.{0,100}/, /.+/)
    },
    [ACCESSORS.REG_QTY]: {
        ...setHeader('Количество проживающих'),
        ...setAccessor(ACCESSORS.REG_QTY, 70),
        ...setType(TYPE.NUMBER, true),
        ...setValidation(/\d{0,2}/, /\d+/)
    },
    [ACCESSORS.TARIFF_GROUP]: {
        ...setHeader('Группа тарифов'),
        ...setAccessor(ACCESSORS.TARIFF_GROUP, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setSubPath('tariffgroups', 'tariffgroupname'),
        ...setValidation()
    },
    [ACCESSORS.UZO]: {
        ...setHeader('УЗО'),
        ...setAccessor(ACCESSORS.UZO, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setSubPath('uzo', 'uzoname'),
        ...setValidation()
    },

}

export const structureTable = {
    header: setLanguages('Точки подключения', '', ''),
    maxWidth: '900px',
    formName: FORM_NAME,
    columns: [
        {...str[ACCESSORS.ID]},{...BR},
        {...str[ACCESSORS.OBJECT_NAME]},{...BR},
        {...str[ACCESSORS.OBJECT_TYPE]},{...BR},
        {...str[ACCESSORS.REG_QTY]},{...BR},
        {...str[ACCESSORS.TARIFF_GROUP]},{...BR},

    ],
    mainValues: {
        parameters: [
            {...str[ACCESSORS.OBJECT_NAME]},{...BR},
            {...str[ACCESSORS.OBJECT_TYPE]},{...BR},
            {...str[ACCESSORS.REG_QTY]},{...BR},
            {...str[ACCESSORS.TARIFF_GROUP]},{...BR},
            {...str[ACCESSORS.FLAT_NUMBER]},{...BR},
            {...str[ACCESSORS.HOUSE]},{...BR},
            {...str[ACCESSORS.UZO]},{...BR},
        ]
    },
}