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

const FORM_NAME = 'contracts'

const BR = setBreak();

const ACCESSORS = {
    ID: 'id',
    CONTRACT_NUMBER: 'contractnumber',
    CONTRACT_DATE: 'contractdate',
    CUSTOMER_GROUPS: 'customergroups',
    R_SH: 'rsh',
    NARAD: 'narad',
    SUBJECT: 'subjects',
    AREA: 'area',
    SECTOR: 'sector',
    WORKER: 'worker',
    ESO: 'eso',
    ESO_CONTRACT: 'esocontract',
}


export const str = {
    [ACCESSORS.ID]: {
        ...setHeader('ID'),
        ...setAccessor(ACCESSORS.ID, 70),
        ...setType(TYPE.ID, true),
        ...setOrdering(true, true),
        ...setValidation()
    },
    [ACCESSORS.CONTRACT_NUMBER]: {
        ...setHeader('Номер договора'),
        ...setAccessor(ACCESSORS.CONTRACT_NUMBER, 200),
        ...setType(TYPE.STRING, true),
        ...setOrdering(true, true),
        ...setValidation()
    },
    [ACCESSORS.R_SH]: {
        ...setHeader('Расчетный счет'),
        ...setAccessor(ACCESSORS.R_SH, 200),
        ...setType(TYPE.STRING, true),
        ...setOrdering(true, true),
        ...setValidation()
    },
    [ACCESSORS.CONTRACT_DATE]: {
        ...setHeader('Дата заключения'),
        ...setAccessor(ACCESSORS.CONTRACT_DATE, 150),
        ...setType(TYPE.DATE, true),
        ...setOrdering(true, true),
        ...setValidation('0000{-}00{-}00', /\d{4}-\d{2}-\d{2}/)
    },
    [ACCESSORS.AREA]: {
        ...setHeader('Cетевой участок'),
        ...setAccessor(ACCESSORS.AREA, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('areas', 'areaname'),
        ...setValidation()
    },
    [ACCESSORS.SECTOR]: {
        ...setHeader('Район города'),
        ...setAccessor(ACCESSORS.SECTOR, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('sectors', 'sectorname'),
        ...setValidation()
    },
    [ACCESSORS.CUSTOMER_GROUPS]: {
        ...setHeader('Группа потребления'),
        ...setAccessor(ACCESSORS.CUSTOMER_GROUPS, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('customergroups', 'customergroupname'),
        ...setValidation()
    },
    [ACCESSORS.NARAD]: {
        ...setHeader('Создать наряд'),
        ...setAccessor(ACCESSORS.NARAD, 150),
        ...setType(TYPE.BOOLEAN, true),
        options:['НЕТ','ДА'],
        ...setOrdering(true, true),
        ...setSubPath('customergroups', 'customergroupname'),
        ...setValidation()
    },
    [ACCESSORS.ESO]: {
        ...setHeader('ЭСО'),
        ...setAccessor(ACCESSORS.ESO, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('eso', 'esoname'),
        ...setValidation()
    },
    [ACCESSORS.ESO_CONTRACT]: {
        ...setHeader('Договор с ЭСО'),
        ...setAccessor(ACCESSORS.ESO_CONTRACT, 200),
        ...setType(TYPE.STRING, true),
        ...setOrdering(true, true),
        ...setValidation()
    },
    [ACCESSORS.SUBJECT]: {
        ...setHeader('Субъект'),
        ...setAccessor(ACCESSORS.SUBJECT, 250),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('subjects', 'subname'),
        ...setValidation()
    },

}

export const structureTable = {
    header: setLanguages('Договоры', '', ''),
    maxWidth: '900px',
    formName: FORM_NAME,
    columns: [
        {...str[ACCESSORS.ID]},
        {...str[ACCESSORS.CONTRACT_NUMBER]},
        {...str[ACCESSORS.SUBJECT]},
        {...str[ACCESSORS.CONTRACT_DATE]},
    ],
    mainValues: {
        parameters: [
            {...str[ACCESSORS.CONTRACT_DATE]}, {...str[ACCESSORS.CONTRACT_NUMBER]}, {...BR},
            {...str[ACCESSORS.SUBJECT]}, {...BR},
            {...str[ACCESSORS.ESO]},{...str[ACCESSORS.ESO_CONTRACT]},{...BR},
        ]
    },
    tabs: [
        {
            name: setLanguages('Точки подключения'),
            type:'binding',
            parameters: []
        },
        {
            name: setLanguages('Данные договора'),
            parameters: [
                {...str[ACCESSORS.AREA]},{...str[ACCESSORS.SECTOR]}, {...BR},
                {...str[ACCESSORS.CUSTOMER_GROUPS]},{...BR},
                {...str[ACCESSORS.R_SH]},{...BR},
                {...str[ACCESSORS.NARAD]}, {...BR},
            ]
        },
        {
            name: setLanguages('Дополнительные данные'),
            parameters: [
                {...str[ACCESSORS.AREA]}, {...BR},
            ]
        }
    ],
    bindingData: []
}