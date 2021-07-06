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
}


export const str = {
    [ACCESSORS.AREA]: {
        ...setHeader('Cетевой участок'),
        ...setAccessor(ACCESSORS.AREA, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('areas', 'areaname'),
        ...setValidation()
    },
    [ACCESSORS.BARCODE]: {
        ...setHeader('Штрихкод'),
        ...setAccessor(ACCESSORS.BARCODE, 200),
        ...setType(TYPE.STRING, true),
        ...setValidation()
    },
    [ACCESSORS.CONSIGNEE]: {
        ...setHeader('Грузополучатель'),
        ...setAccessor(ACCESSORS.CONSIGNEE, 250),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('subjects', 'subname'),
        ...setValidation()
    },
    [ACCESSORS.CONTRACT_NUMBER]: {
        ...setHeader('Номер договора'),
        ...setAccessor(ACCESSORS.CONTRACT_NUMBER, 200),
        ...setType(TYPE.STRING, true),
        ...setOrdering(true, true),
        ...setValidation()
    },
    [ACCESSORS.CUSTOMER]: {
        ...setHeader('Субъект'),
        ...setAccessor(ACCESSORS.CUSTOMER, 250),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('subjects', 'subname'),
        ...setValidation()
    },
    [ACCESSORS.CUSTOMER_GROUP]: {
        ...setHeader('Группа потребления'),
        ...setAccessor(ACCESSORS.CUSTOMER_GROUP, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('customergroups', 'customergroupname'),
        ...setValidation()
    },
    [ACCESSORS.END_DATE]: {
        ...setHeader('Дата расторжения'),
        ...setAccessor(ACCESSORS.END_DATE, 150),
        ...setType(TYPE.DATE, true),
        ...setOrdering(true, true),
        ...setValidation('0000{-}00{-}00', /\d{4}-\d{2}-\d{2}/)
    },
    [ACCESSORS.ESO]: {
        ...setHeader('ЭСО'),
        ...setAccessor(ACCESSORS.ESO, 200),
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true, true),
        ...setSubPath('eso', 'esoname'),
        ...setValidation()
    },
    [ACCESSORS.ESO_CONTRACT_NUMBER]: {
        ...setHeader('Договор с ЭСО'),
        ...setAccessor(ACCESSORS.ESO_CONTRACT_NUMBER, 200),
        ...setType(TYPE.STRING, true),
        ...setOrdering(true, true),
        ...setValidation()
    },
    [ACCESSORS.ID]: {
        ...setHeader('ID'),
        ...setAccessor(ACCESSORS.ID, 70),
        ...setType(TYPE.ID, true),
        ...setOrdering(true, true),
        ...setValidation()
    },
    [ACCESSORS.PERSONAL_ACCOUNT]: {
        ...setHeader('Лицевой счет'),
        ...setAccessor(ACCESSORS.PERSONAL_ACCOUNT, 200),
        ...setType(TYPE.NUMBER, true),
        ...setOrdering(true, true),
        ...setValidation()
    },
    [ACCESSORS.START_DATE]: {
        ...setHeader('Дата заключения'),
        ...setAccessor(ACCESSORS.START_DATE, 150),
        ...setType(TYPE.DATE, true),
        ...setOrdering(true, true),
        ...setValidation('0000{-}00{-}00', /\d{4}-\d{2}-\d{2}/)
    },

}

export const structureTable = {
    header: setLanguages('Договоры', '', ''),
    maxWidth: '900px',
    formName: FORM_NAME,
    columns: [
        {...str[ACCESSORS.ID]},
        {...str[ACCESSORS.CONTRACT_NUMBER]},
        {...str[ACCESSORS.START_DATE]},
        {...str[ACCESSORS.CUSTOMER]},
    ],
    mainValues: {
        parameters: [
            {...str[ACCESSORS.CONTRACT_NUMBER]},
            {...str[ACCESSORS.START_DATE]},{...BR},
            {...str[ACCESSORS.CUSTOMER]},{...BR},
            {...str[ACCESSORS.CONSIGNEE]},{...BR},
        ]
    },
    tabs: [
        {
            name: setLanguages('Точки подключения'),
            type: 'binding',
            parameters: []
        },
        {
            name: setLanguages('Данные договора'),
            parameters: [
                {...str[ACCESSORS.ESO]},{...str[ACCESSORS.ESO_CONTRACT_NUMBER]},{...BR},
                {...str[ACCESSORS.CUSTOMER_GROUP]},{...str[ACCESSORS.AREA]},{...BR},

                {...str[ACCESSORS.PERSONAL_ACCOUNT]},{...BR},
            ]
        },
        {
            name: setLanguages('Дополнительные данные'),
            parameters: []
        }
    ],
    bindingData: []
}