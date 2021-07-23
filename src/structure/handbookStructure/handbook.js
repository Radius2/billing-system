import {AVAILABLE_LANGUAGE, setLanguages} from '../../util/language';
import * as subjects from '../formStructures/subjectStructure'

export const HANDBOOK_PATH = '/handbook/';

export const TYPE = {
    ID: 'id',
    BOOLEAN: 'boolean',
    DATE: 'date',
    STRING: 'string',
    NUMBER: 'number',
    SUB_VALUE: 'subValue',
    SUB_SUB_VALUE: 'subsubvalue',
    BR: 'newRow',
};

const ACT_TYPES = 'acttypes';
const AREAS = 'areas';
const BANKS = 'banks';
const BUILDING_TYPES = 'building_types';
const CASH_DESKS = 'cashdesks';
const CITIES = 'cities';
const CHARGE_TYPES = 'chargetypes';
const CONNECTORS = 'connectors';
const CUSTOMER_GROUPS = 'customergroups';
const ESO = 'eso';
const FORM_TYPES = 'form_types';
const GRP = 'grp';
const HOUSES = 'houses';
const INPUT_TYPES = 'input_types';
const KSK = 'ksk';
const OBJ_TYPES = 'objtypes';
const ORG_INFO = 'org_info';
const PAYMENT_TYPES = 'paymenttypes';
const POSITIONS = 'positions';
const PU_TYPES = 'putypes';
const RELIABILITIES = 'reliabilities';
const RP = 'rp';
const SECTORS = 'sectors';
const SUB_BANKS = 'sub_banks';
const STREETS = 'streets';
const SUB_TYPES = 'sub_types';
const TARIFF_GROUPS = 'tariffgroups';
const TARIFFS = 'tariffs';
const TP = 'tp';
const UZO = 'uzo';
const VOLTAGES = 'voltages';


//Установка имени параметра и ширины колонки
export function setAccessor(accessor, widthColumn, lowerCase = false) {
    return {accessor: accessor.toLowerCase(), width: widthColumn + 'px', lowerCase};
}

//Установка маски ввода согласно  react-imask и валидации регул выражением
function setValidation(maskInput = /\.{0,200}/, maskValidation = /\.{0,200}/, additionMaskInput) {
    return {
        maskInput: {
            mask: maskInput,
            ...additionMaskInput,
        },
        maskValidation,
    };
}

//Установка признаков фильтрации и сортировки по параметру
export function setOrdering(filter = false, sort = false) {
    return {filter, sort};
}

//Установка типа и признака отображения параметра в главной таблице
export function setType(type, mainValue = true) {
    return {type, mainValue};
}

//Установка переноса строки при валидации
export function setBreak() {
    return {break: true};
}

export const handbooks = {
    [ACT_TYPES]: {
        name: setLanguages('Типы актов', '', ''),
        maxWidth: '400px',
        formName: ACT_TYPES,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование типов актов', '', ''),
                ...setAccessor('acttypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [AREAS]: {
        name: setLanguages('Участки', '', ''),
        maxWidth: '400px',
        formName: AREAS,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование участка', '', ''),
                ...setAccessor('areaname', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Номер участка', '', ''),
                ...setAccessor('areanumber', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [BANKS]: {
        name: setLanguages('Банки', '', ''),
        maxWidth: '800px',
        formName: BANKS,
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(),
                ...setValidation(),
            },
            {
                header: setLanguages('Название банка', '', ''),
                ...setAccessor('bankname', 200),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('МФО', '', ''),
                ...setAccessor('mfo', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                ...setAccessor('bankdescr', 300, true),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,200}/, /^.+/),
            },
        ],
    },
    [BUILDING_TYPES]: {
        name: setLanguages('Типы зданий', '', ''),
        maxWidth: '400px',
        formName: BUILDING_TYPES,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование типов зданий', '', ''),
                ...setAccessor('buildingtypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [CASH_DESKS]: {
        name: setLanguages('Кассы', '', ''),
        maxWidth: '400px',
        formName: CASH_DESKS,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование кассы', '', ''),
                ...setAccessor('cashdeskname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [CITIES]: {
        name: setLanguages('Города', '', ''),
        maxWidth: '400px',
        formName: CITIES,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Город', '', ''),
                ...setAccessor('cityname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [CHARGE_TYPES]: {
        name: setLanguages('Типы начислений', '', ''),
        maxWidth: '400px',
        formName: CHARGE_TYPES,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Тип начисления', '', ''),
                ...setAccessor('chargetypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [CONNECTORS]: {
        name: setLanguages('Уровени подсоединения', '', ''),
        maxWidth: '400px',
        formName: CONNECTORS,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Уровень подсоединения', '', ''),
                ...setAccessor('connectorname', 300),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [CUSTOMER_GROUPS]: {
        name: setLanguages('Группы потребителей', '', ''),
        maxWidth: '400px',
        formName: CUSTOMER_GROUPS,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Группа потребителей', '', ''),
                ...setAccessor('customergroupname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [ESO]: {
        name: setLanguages('ЭСО', '', ''),
        maxWidth: '400px',
        formName: ESO,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование ЭСО', '', ''),
                ...setAccessor('esoname', 250, true),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [SUB_BANKS]: {
        name: setLanguages('Счета субъектов', '', ''),
        maxWidth: '800px',
        formName: SUB_BANKS,
        columns: [
            {
                header: setLanguages('Номер счета', '', ''),
                ...setAccessor('accnumber', 200),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Название банка', '', ''),
                ...setAccessor('bank', 200, true),
                ...setType(TYPE.SUB_VALUE, true),
                subPath: {structure: () => handbooks[BANKS], accessor: 'bankname'},
                ...setOrdering(),
            },
            {
                header: setLanguages('Субъект'),
                ...setAccessor('subj', 200, true),
                ...setType(TYPE.STRING, true),
                ...setType(TYPE.SUB_VALUE, true),
                subPath: {structure: () => subjects.structureTable, accessor: 'subname'},
                ...setOrdering(true, true),
            },
        ],
    }, //Subject accounts
    [FORM_TYPES]: {
        name: setLanguages('Типы форм', 'Пішін түрлері', 'Form types'),
        maxWidth: '600px',
        formName: FORM_TYPES,
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(false, true),
                ...setValidation(),
            },
            {
                header: setLanguages('Название формы', 'Форманың атауы', 'Form name'),
                ...setAccessor('formtypename', 200),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                ...setAccessor('formtypedescr', 250, true),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [GRP]: {
        name: setLanguages('ГРП'),
        maxWidth: '400px',
        formName: GRP,
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(false, true),
                ...setValidation(),
            },
            {
                header: setLanguages('Наименование ГРГ'),
                ...setAccessor('grpname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [HOUSES]: {
        name: setLanguages('Здания'),
        maxWidth: '1000px',
        formName: HOUSES,
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(false, true),
                ...setValidation(),
            },
            {
                header: setLanguages('Город'),
                ...setAccessor('street', 200),
                ...setType(TYPE.SUB_SUB_VALUE, true),
                subSubPath: {accessor: 'city', subAccessor: 'cityname'},
                ...setOrdering(),
                ...setValidation(/^.{0,100}/, false),
            },
            {
                header: setLanguages('Улица'),
                ...setAccessor('street', 300),
                ...setType(TYPE.SUB_VALUE, true),
                subPath: {structure: () => handbooks[STREETS], accessor: 'streetname'},
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('№ дома'),
                ...setAccessor('housenumber', 100),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Корпус'),
                ...setAccessor('buildingnumber', 100),
                ...setType(TYPE.STRING, false),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, false),
            },
            {
                header: setLanguages('Тип сооружения'),
                ...setAccessor('buildingtype', 150),
                ...setType(TYPE.SUB_VALUE, false),
                subPath: {structure: () => handbooks[BUILDING_TYPES], accessor: 'buildingtypename'},
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, false),
            },
            {
                header: setLanguages('Район'),
                ...setAccessor('sector', 150),
                ...setType(TYPE.SUB_VALUE, false),
                subPath: {structure: () => handbooks[SECTORS], accessor: 'sectorname'},
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, false),
                ...setBreak(),
            },
            {
                header: setLanguages('Участок'),
                ...setAccessor('area', 200),
                ...setType(TYPE.SUB_VALUE, false),
                subPath: {structure: () => handbooks[AREAS], accessor: 'areaname'},
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, false),
            },
            {
                header: setLanguages('Присоединение'),
                ...setAccessor('connector', 200),
                ...setType(TYPE.SUB_VALUE, false),
                subPath: {structure: () => handbooks[CONNECTORS], accessor: 'connectorname'},
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /.+/),
            },
            {
                header: setLanguages('Тип отпуска'),
                ...setAccessor('inputtype', 200),
                ...setType(TYPE.SUB_VALUE, false),
                subPath: {structure: () => handbooks[INPUT_TYPES], accessor: 'inputtypename'},
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /.+/),
            },
            {
                header: setLanguages('Надежность'),
                ...setAccessor('reliability', 150),
                ...setType(TYPE.SUB_VALUE, false),
                subPath: {structure: () => handbooks[RELIABILITIES], accessor: 'reliabilityname'},
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /.+/),
                ...setBreak(),
            },
            {
                header: setLanguages('Напряжение'),
                ...setAccessor('voltage', 150),
                ...setType(TYPE.SUB_VALUE, false),
                subPath: {structure: () => handbooks[VOLTAGES], accessor: 'voltagename'},
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /.+/),
            },
            {
                header: setLanguages('КСК'),
                ...setAccessor('ksk', 200),
                ...setType(TYPE.SUB_VALUE, false),
                subPath: {structure: () => handbooks[KSK], accessor: 'kskname'},
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /.+/),
            },
            {
                header: setLanguages('РП'),
                ...setAccessor('rp', 200),
                ...setType(TYPE.SUB_VALUE, false),
                subPath: {structure: () => handbooks[RP], accessor: 'rpname'},
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /.+/),
            },
        ],
    },
    [INPUT_TYPES]: {
        name: setLanguages('Типы входы/отпуска из сети', '', ''),
        maxWidth: '400px',
        formName: INPUT_TYPES,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование типа', '', ''),
                ...setAccessor('inputtypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [KSK]: {
        name: setLanguages('КСК', '', ''),
        maxWidth: '1000px',
        formName: KSK,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование КСК', '', ''),
                ...setAccessor('kskname', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Руководитель КСК', '', ''),
                ...setAccessor('kskhead', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Адрес', '', ''),
                ...setAccessor('kskaddress', 200),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,200}/, /^.+/),
            },
            {
                header: setLanguages('Номер телефона'),
                ...setAccessor('kskphone', 200),
                ...setType(TYPE.STRING, true),
                ...setValidation('+{7}(000)000-0000', /^\d{11}$/),
            },
        ],
    },
    [OBJ_TYPES]: {
        name: setLanguages('Тип точки учета', '', ''),
        maxWidth: '400px',
        formName: OBJ_TYPES,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование', '', ''),
                ...setAccessor('objtypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [ORG_INFO]: {
        name: setLanguages('Поставщики услуг', '', ''),
        maxWidth: '1300px',
        formName: ORG_INFO,
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Название', '', ''),
                ...setAccessor('oiname', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Полное название', '', ''),
                ...setAccessor('oifname', 300),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Адрес', '', ''),
                ...setAccessor('oiaddr', 200),
                ...setType(TYPE.STRING, true),
                ...setOrdering(),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Номер аккаунта', '', ''),
                ...setAccessor('oiaccnumber', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Банк', '', ''),
                ...setAccessor('oibank', 150),
                subPath: {structure: () => handbooks[BANKS], accessor: 'bankname'},
                ...setType(TYPE.SUB_VALUE, true),
                ...setOrdering(true, true),
            },
            {
                header: setLanguages('БИН', '', ''),
                ...setAccessor('oibin', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    }, //поставщик
    [PAYMENT_TYPES]: {
        name: setLanguages('Типы платежей', '', ''),
        maxWidth: '400px',
        formName: PAYMENT_TYPES,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование типа', '', ''),
                ...setAccessor('paymenttypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [POSITIONS]: {
        name: setLanguages('Должности', '', ''),
        maxWidth: '400px',
        formName: POSITIONS,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование должность', '', ''),
                ...setAccessor('positionname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [PU_TYPES]: {
        name: setLanguages('Приборы учета (ПУ)', '', ''),
        maxWidth: '400px',
        formName: PU_TYPES,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование ПУ', '', ''),
                ...setAccessor('putypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [RELIABILITIES]: {
        name: setLanguages('Категория надежности', '', ''),
        maxWidth: '400px',
        formName: RELIABILITIES,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование категории', '', ''),
                ...setAccessor('reliabilityname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [RP]: {
        name: setLanguages('РП', '', ''),
        maxWidth: '1400px',
        formName: RP,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование РП', '', ''),
                ...setAccessor('rpname', 170),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Инвентарный номер', '', ''),
                ...setAccessor('invnumber', 200),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Входное напряжение', '', ''),
                ...setAccessor('inputvoltage', 230),
                ...setType(TYPE.SUB_VALUE, true),
                subPath: {structure: () => handbooks[VOLTAGES], accessor: 'voltagename'},
                ...setOrdering(false, false),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Выходное напряжение 1', '', ''),
                ...setAccessor('outputvoltage1', 230),
                ...setType(TYPE.SUB_VALUE, true),
                subPath: {structure: () => handbooks[VOLTAGES], accessor: 'voltagename'},
                ...setOrdering(false, false),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Выходное напряжение 2', '', ''),
                ...setAccessor('outputvoltage2', 230),
                ...setType(TYPE.SUB_VALUE, true),
                subPath: {structure: () => handbooks[VOLTAGES], accessor: 'voltagename'},
                ...setOrdering(false, false),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('ТП', '', ''),
                ...setAccessor('tp', 200),
                ...setType(TYPE.SUB_VALUE, true),
                subPath: {structure: () => handbooks[TP], accessor: 'tpname'},
                ...setOrdering(false, false),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('ГРП', '', ''),
                ...setAccessor('tp', 200),
                ...setType(TYPE.SUB_SUB_VALUE, false),
                subSubPath: {accessor: 'grp', subAccessor: 'grpname'},
                ...setOrdering(false, false),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [SECTORS]: {
        name: setLanguages('Районы города', '', ''),
        maxWidth: '400px',
        formName: SECTORS,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Название района', '', ''),
                ...setAccessor('sectorname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [STREETS]: {
        name: setLanguages('Улицы'),
        maxWidth: '800px',
        noDeleteButton: true,
        hasHistory: true,
        formName: STREETS,
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(false, true),
                ...setValidation(),
            },
            {
                header: setLanguages('Название улицы'),
                ...setAccessor('streetname', 200),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Город'),
                ...setAccessor('city', 200),
                ...setType(TYPE.SUB_VALUE, true),
                subPath: {structure: () => handbooks[CITIES], accessor: 'cityname'},
                ...setOrdering(),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Создана'),
                ...setAccessor('created', 150),
                ...setType(TYPE.DATE, true),
                ...setOrdering(),
                ...setValidation('0000{-}00{-}00', /^\d{4}-\d{2}-\d{2}$/),
            },
            // {
            //     header: setLanguages('Закрыта',),
            //     ...setAccessor('closed', 150),
            //     ...setType(TYPE.DATE, true),
            //     ...setOrdering(true, true),
            //     ...setValidation('0000{-}00{-}00', false),
            // },
        ],
    },
    [SUB_TYPES]: {
        name: setLanguages('Виды субъектов'),
        maxWidth: '650px',
        formName: SUB_TYPES,
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(),
                ...setValidation(),
            },
            {
                header: setLanguages('Наименование вида'),
                ...setAccessor('subtypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                ...setAccessor('subtypedescr', 250, true),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },

    [TARIFF_GROUPS]: {
        name: setLanguages('Группы тарифов', '', ''),
        maxWidth: '400px',
        formName: TARIFF_GROUPS,
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
            {
                header: setLanguages('Наименование группы', '', ''),
                ...setAccessor('tariffgroupname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true, true),
                ...setValidation(/^.{0,100}/, /^.+/),
            },
        ],
    },
    [TARIFFS]: {
        name: setLanguages('Тарифы', '', ''),
        maxWidth: '1200px',
        formName: TARIFFS,
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setOrdering(false, true),
                ...setType(TYPE.ID, true),
            },
            {
                header: setLanguages('Наименование тарифа'),
                ...setAccessor('tariffname', 250),
                ...setOrdering(true, true),
                ...setType(TYPE.STRING, true),
                ...setValidation(/^.{0,100}$/, /^.+$/),
            },
            {
                header: setLanguages('Норма'),
                ...setAccessor('norma', 150),
                ...setOrdering(true, true),
                ...setType(TYPE.NUMBER, true),
                ...setValidation(Number, /^\d{1,3}(.\d{1,2})?$/, {min: -1}),
            },
            {
                header: setLanguages('Тариф'),
                ...setAccessor('tariff', 150),
                ...setOrdering(true, true),
                ...setType(TYPE.NUMBER, true),
                ...setValidation(Number, /^\d{1,3}(.\d{1,2})?$/),
            },
            {
                header: setLanguages('Действует с'),
                ...setAccessor('startdate', 150),
                ...setOrdering(true, true),
                ...setType(TYPE.DATE, true),
                ...setValidation('0000{-}00{-}00', /^\d{4}-\d{2}-\d{2}$/),
            },
            {
                header: setLanguages('Действует до'),
                ...setAccessor('enddate', 150),
                ...setOrdering(true, true),
                ...setType(TYPE.DATE, true),
                ...setValidation('0000{-}00{-}00', false),
            },
            {
                header: setLanguages('Группа тарифа'),
                ...setAccessor('tariffgroup', 200),
                subPath: {structure: () => handbooks[TARIFF_GROUPS], accessor: 'tariffgroupname'},
                ...setType(TYPE.SUB_VALUE, true),
            },
        ],
    }, //потребитель
    [TP]: {
        name: setLanguages('ТП', '', ''),
        maxWidth: '500px',
        formName: TP,
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setOrdering(false, true),
                ...setType(TYPE.ID, true),
            },
            {
                header: setLanguages('Наименование ТП'),
                ...setAccessor('tpname', 200),
                ...setOrdering(true, true),
                ...setType(TYPE.STRING, true),
                ...setValidation(/^.{0,100}$/, /^.+$/),
            },
            {
                header: setLanguages('ГРП'),
                ...setAccessor('grp', 150),
                subPath: {structure: () => handbooks[GRP], accessor: 'grpname'},
                ...setType(TYPE.SUB_VALUE, true),
            },
        ],
    }, //потребитель
    [UZO]: {
        name: setLanguages('УЗО', '', ''),
        maxWidth: '500px',
        formName: UZO,
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setOrdering(false, true),
                ...setType(TYPE.ID, true),
            },
            {
                header: setLanguages('Наименование УЗО'),
                ...setAccessor('uzoname', 200),
                ...setOrdering(true, true),
                ...setType(TYPE.STRING, true),
                ...setValidation(/^.{0,100}$/, /^.+$/),
            },
            {
                header: setLanguages('Величина УЗО'),
                ...setAccessor('uzovalue', 200),
                ...setOrdering(true, true),
                ...setType(TYPE.NUMBER, true),
                ...setValidation(/^\d{0,100}$/, /^.+$/),
            },
        ],
    }, //потребитель
    [VOLTAGES]: {
        name: setLanguages('Напряжение', '', ''),
        maxWidth: '550px',
        formName: VOLTAGES,
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setOrdering(false, true),
                ...setType(TYPE.ID, true),
            },
            {
                header: setLanguages('Наименование напряжения'),
                ...setAccessor('voltagename', 250),
                ...setOrdering(true, true),
                ...setType(TYPE.STRING, true),
                ...setValidation(/^.{0,100}$/, /^.+$/),
            },
            {
                header: setLanguages('Величина напряжения'),
                ...setAccessor('voltagevalue', 200),
                ...setOrdering(true, true),
                ...setType(TYPE.NUMBER, true),
                ...setValidation(/^\d{0,100}$/, /^.+$/),
            },
        ],
    }, //потребитель
};

export function getHandbooks() {
    const handbooksList = [];
    Object.keys(handbooks).forEach(title => {
        const allName = AVAILABLE_LANGUAGE.map(lang => handbooks[title].name[lang]).join('/');
        handbooksList.push({
            header: lang => `${handbooks[title].name[lang]}`,
            name: allName,
            path: HANDBOOK_PATH + title,
        });
    });
    return handbooksList;
}
