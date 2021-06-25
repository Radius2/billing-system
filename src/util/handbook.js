import {AVAILABLE_LANGUAGE, setLanguages} from './language';

export const HANDBOOK_PATH = '/handbook/'

export const TYPE = {
    ID: 'id',
    BOOLEAN: 'boolean',
    DATE: 'date',
    STRING: 'string',
    NUMBER: 'number',
    SUB_VALUE: 'subValue',
    BR: 'newRow'
}

const BANKS = 'banks';
const FORM_TYPES = 'form_types';
const ORG_INFO = 'org_info';
const POSITIONS = 'positions';
const SUB_BANKS = 'sub_banks';
const SUB_TYPES = 'sub_types';
const SUBJECTS = 'subjects';

const onlyWord = '[A-zА-яЁё]'

//Установка имени параметра и ширины колонки
function setAccessor(accessor, widthColumn) {
    return {accessor: accessor.toLowerCase(), width: widthColumn + 'px'}
}

//Установка маски ввода согласно  react-imask и валидации регул выражением
function setValidation(maskInput = /\.{0,200}/, maskValidation = /\.{0,200}/, additionMaskInput) {
    return {
        maskInput: {
            mask:maskInput,
            ...additionMaskInput
        },
        maskValidation
    }
}


//Установка признаков фильтрации и сортировки по параметру
function setOrdering(filter = false, sort = false) {
    return {filter, sort}
}

//Установка типа и признака отображения параметра в главной таблице
function setType(type, mainValue = true) {
    return {type, mainValue}
}

//Установка переноса строки при валидации
function setBreak() {
    return {break: true}
}

export const handbooks = {
    [BANKS]: {
        name: setLanguages('Банки', '', ''),
        maxWidth: '800px',
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
                ...setAccessor('bankname',  200),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/),
            },
            {
                header: setLanguages('МФО', '', ''),
                ...setAccessor('mfo',  150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(),
                ...setValidation(/^.{0,100}/,/^.+/),
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                ...setAccessor('bankdescr', 300),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,200}/,/^.+/),
            },
        ],
    },
    [SUB_BANKS]: {
        name: setLanguages('Счета субъектов', '', ''),
        maxWidth: '800px',
        columns: [
            {
                header: setLanguages('Номер счера', '', ''),
                ...setAccessor('accnumber',  200),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/),
            },
            {
                header: setLanguages('Название банка', '', ''),
                ...setAccessor('bank',  200),
                ...setType(TYPE.SUB_VALUE, true),
                subPath: {path: BANKS, accessor: 'bankname'},
                ...setOrdering(),
            },
            {
                header: setLanguages("Субъект"),
                ...setAccessor('subj', 200),
                ...setType(TYPE.STRING, true),
                ...setType(TYPE.SUB_VALUE, true),
                subPath: {path: SUBJECTS, accessor: 'subname'},
                ...setOrdering(),
            },
        ],
    },//Subject accounts
    [FORM_TYPES]: {
        name: setLanguages('Типы форм', 'Пішін түрлері', 'Form types'),
        maxWidth: '600px',
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 0, 70, TYPE.ID, false, false, true),
                ...setType(TYPE.ID, true),
            },
            {
                header: setLanguages('Название формы', 'Форманың атауы', 'Form name'),
                ...setAccessor('formtypename', 30, 200, TYPE.STRING, true, true, true),
                ...setType(TYPE.STRING, true),
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                ...setAccessor('formtypedescr', 200, null, TYPE.STRING, false, true, true),
                ...setType(TYPE.STRING, true),
            },
        ],
    },
    [ORG_INFO]: {
        name: setLanguages('Организации', '', ''),
        maxWidth: '1000px',
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 0, 70, TYPE.ID, false, false, true),
                ...setType(TYPE.ID, true),
            },
            {
                header: setLanguages('Название', '', ''),
                ...setAccessor('oiname', 100, 150, TYPE.STRING, true, true, true),
                ...setType(TYPE.STRING, true),
            },
            {
                header: setLanguages('Полное название', '', ''),
                ...setAccessor('oifname', 200, null, TYPE.STRING, true, true, true),
                ...setType(TYPE.STRING, true),
            },
            {
                header: setLanguages('Адрес', '', ''),
                ...setAccessor('oiaddr', 200, 200, TYPE.STRING, true, false, true),
                ...setType(TYPE.STRING, true),
            },
            {
                header: setLanguages('Номер аккаунта', '', ''),
                ...setAccessor('oiaccnumber', 100, 100, TYPE.STRING, true, false, true),
                ...setType(TYPE.STRING, true),
            },
            {
                header: setLanguages('Банк', '', ''),
                ...setAccessor('oibank', 100, 150, TYPE.SUB_VALUE, true, false, true),
                subPath: {path: BANKS, accessor: 'bankname'},
                ...setType(TYPE.SUB_VALUE, true),
            },
            {
                header: setLanguages('БИН', '', ''),
                ...setAccessor('oibin', 12, 150, TYPE.STRING, true, false, true),
                ...setType(TYPE.STRING, true),
            },
        ],
    },//поставщик
    [POSITIONS]: {
        name: setLanguages('Должности', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
            },
            {
                header: setLanguages('Должность', '', ''),
                ...setAccessor('positionname', 150),
                ...setType(TYPE.STRING, true),
            },
        ],
    },
    [SUB_TYPES]: {
        name: setLanguages('Виды субъектов'),
        maxWidth: '600px',
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 0, 70, TYPE.ID, false, false, true),
                ...setType(TYPE.ID, true),
            },
            {
                header: setLanguages('Название подтипов'),
                ...setAccessor('subtypename', 30, 200, TYPE.STRING, true, true, true),
                ...setType(TYPE.STRING, true),
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                ...setAccessor('subtypedescr', 200, null, TYPE.STRING, false, true, true),
                ...setType(TYPE.STRING, true),
            },
        ],
    },
    [SUBJECTS]: {
        name: setLanguages('Субъекты', '', ''),
        maxWidth: '1000px',
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id',70),
                ...setOrdering(false, true),
                ...setType(TYPE.ID, true),
            },
            {
                header: setLanguages('Номер лицевого счета',),
                ...setAccessor('subaccnumber',  250),
                ...setOrdering(true, true),
                ...setType(TYPE.NUMBER, true),
                ...setValidation(/^\d{1,10}$/,/^\d{10}$/),
            },
            {
                header: setLanguages('Нименование',),
                ...setAccessor('subname',  200),
                ...setOrdering(true, true),
                ...setType(TYPE.STRING, true),
                ...setValidation(/^.+$/,/^.+$/),
            },
            {
                header: setLanguages('БИН',),
                ...setAccessor('subbin',  250),
                ...setOrdering(true, true),
                ...setType(TYPE.STRING, true),
                ...setValidation(/^\d{0,12}$/,/^\d{12}$/),
            },
            {
                header: setLanguages('Действует с',),
                ...setAccessor('substart', 200),
                ...setOrdering(true, true),
                ...setType(TYPE.DATE, true),
                ...setValidation('0000{-}00{-}00',/^\d{4}-\d{2}-\d{2}$/ ),
            },
            {
                header: setLanguages('ФИО руководителя',),
                ...setAccessor('subheadname',  350),
                ...setType(TYPE.STRING, false),
                ...setValidation(new RegExp(`^(${onlyWord}{1,100}(\\s?|\\.?)){0,3}$`),/^.+$/)
            },
            {
                header: setLanguages('Должность руководителя',),
                ...setAccessor('subheadpos', 250),
                subPath: {path: POSITIONS, accessor: 'positionname'},
                ...setType(TYPE.SUB_VALUE, false),
                ...setBreak(),
            },
            {
                header: setLanguages('ФИО бухгалтера',),
                ...setAccessor('subaccname', 350),
                ...setOrdering(true, true),
                ...setType(TYPE.STRING, false),
                ...setValidation(new RegExp(`^(${onlyWord}{1,100}(\\s?|\\.?)){0,3}$`),/^.+$/)
            },
            {
                header: setLanguages('Должность бухгалтера',),
                ...setAccessor('subaccpos', 250),
                subPath: {path: POSITIONS, accessor: 'positionname'},
                ...setType(TYPE.SUB_VALUE, false),
                required: true,
                ...setBreak(),
            },
            {
                header: setLanguages('Вид лица',),
                ...setAccessor('subphys', 200),
                options: ['Юрлицо', 'Физлицо',],
                ...setType(TYPE.BOOLEAN, false),
            },
            {
                header: setLanguages('Тип организации',),
                ...setAccessor('subtype',  200),
                subPath: {path: SUB_TYPES, accessor: 'subtypename'},
                ...setType(TYPE.SUB_VALUE, false),
                ...setBreak(),
            },
            {
                header: setLanguages('Адрес',),
                ...setAccessor('subaddr', 300),
                ...setType(TYPE.STRING, false),
                ...setValidation(/^.+$/,/^.+$/),
            },
            {
                header: setLanguages('Номер телефона',),
                ...setAccessor('subphone', 300),
                ...setType(TYPE.STRING, false),
                ...setValidation('+{7}(000)000-0000', /^\d{11}$/),
            },
            {
                header: setLanguages('Описание',),
                ...setAccessor('subdescr', 300),
                ...setType(TYPE.STRING, false),
                ...setValidation(/^.+$/,/^.+$/),
            },
        ],
    }, //потребитель
}

export function getHandbooks() {
    const handbooksList = []
    Object.keys(handbooks).forEach((title) => {
            const allName = AVAILABLE_LANGUAGE.map(lang => handbooks[title].name[lang]).join('/')
            handbooksList.push({
                header: (lang) => `${handbooks[title].name[lang]}`,
                name: allName,
                path: HANDBOOK_PATH + title
            })
        }
    )
    return handbooksList
}
