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

const ACT_TYPES='acttypes';
const AREAS = 'areas';
const BANKS = 'banks';
const BUILDING_TYPES='building_types';
const CASH_DESKS='cashdesks';
const CHARGE_TYPES='chargetypes';
const CONNECTORS='connectors';
const CUSTOMER_GROUPS = 'customergroups'
const ESO = 'eso'
const FORM_TYPES = 'form_types';
const INPUT_TYPES = 'input_types';
const KSK = 'ksk';
const OBJ_TYPES = 'objtypes';
const ORG_INFO = 'org_info';
const PAYMENT_TYPES = 'paymenttypes';
const POSITIONS = 'positions';
const PU_TYPES = 'putypes';
const RELIABILITIES = 'reliabilities';
const SECTORS = 'sectors';
const SUB_BANKS = 'sub_banks';
const SUB_TYPES = 'sub_types';
const SUBJECTS = 'subjects';
const TARIFF_GROUPS='tariffgroups'
const TARIFFS='tariffs'


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
    [ACT_TYPES]: {
        name: setLanguages('Типы актов', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование типов актов', '', ''),
                ...setAccessor('acttypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [AREAS]: {
        name: setLanguages('Участки', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование участка', '', ''),
                ...setAccessor('areaname', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
            {
                header: setLanguages('Номер участка', '', ''),
                ...setAccessor('areanumber', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
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
    [BUILDING_TYPES]: {
        name: setLanguages('Типы зданий', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование типов зданий', '', ''),
                ...setAccessor('buildingtypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [CASH_DESKS]: {
        name: setLanguages('Кассы', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование кассы', '', ''),
                ...setAccessor('cashdeskname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [CHARGE_TYPES]: {
        name: setLanguages('Типы начислений', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование типа начислений', '', ''),
                ...setAccessor('chargetypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [CONNECTORS]: {
        name: setLanguages('Уровени подсоединения', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование уровня подсоединения', '', ''),
                ...setAccessor('connectorname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [CUSTOMER_GROUPS]: {
        name: setLanguages('Группы потребителей', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование группы потребителя', '', ''),
                ...setAccessor('customergroupname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [ESO]: {
        name: setLanguages('ЭСО', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование ЭСО', '', ''),
                ...setAccessor('esoname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
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
                ...setAccessor('id',  70, ),
                ...setType(TYPE.ID, true),
                ...setOrdering(false,true),
                ...setValidation()
            },
            {
                header: setLanguages('Название формы', 'Форманың атауы', 'Form name'),
                ...setAccessor('formtypename', 200,),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                ...setAccessor('formtypedescr',  250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [INPUT_TYPES]: {
        name: setLanguages('Типы входы/отпуска из сети', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование типа', '', ''),
                ...setAccessor('inputtypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [KSK]: {
        name: setLanguages('КСК', '', ''),
        maxWidth: '1000px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование КСК', '', ''),
                ...setAccessor('kskname', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
            {
                header: setLanguages('Руководитель КСК', '', ''),
                ...setAccessor('kskhead', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
            {
                header: setLanguages('Адрес', '', ''),
                ...setAccessor('kskaddress', 200),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,200}/,/^.+/)
            },
            {
                header: setLanguages('Номер телефона',),
                ...setAccessor('kskphone', 200),
                ...setType(TYPE.STRING, true),
                ...setValidation('+{7}(000)000-0000', /^\d{11}$/),
            },
        ],
    },
    [OBJ_TYPES]: {
        name: setLanguages('Тип точки учета', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование типа', '', ''),
                ...setAccessor('objtypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [ORG_INFO]: {
        name: setLanguages('Поставщики услуг', '', ''),
        maxWidth: '1300px',
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70,),
                ...setType(TYPE.ID, true),
                ...setOrdering(),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
            {
                header: setLanguages('Название', '', ''),
                ...setAccessor('oiname',  150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
            {
                header: setLanguages('Полное название', '', ''),
                ...setAccessor('oifname', 300),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
            {
                header: setLanguages('Адрес', '', ''),
                ...setAccessor('oiaddr', 200),
                ...setType(TYPE.STRING, true),
                ...setOrdering(),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
            {
                header: setLanguages('Номер аккаунта', '', ''),
                ...setAccessor('oiaccnumber', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
            {
                header: setLanguages('Банк', '', ''),
                ...setAccessor('oibank', 150),
                subPath: {path: BANKS, accessor: 'bankname'},
                ...setType(TYPE.SUB_VALUE, true),
                ...setOrdering(true,true),
            },
            {
                header: setLanguages('БИН', '', ''),
                ...setAccessor('oibin', 150),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },//поставщик
    [PAYMENT_TYPES]: {
        name: setLanguages('Типы платежей', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование типа', '', ''),
                ...setAccessor('paymenttypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [POSITIONS]: {
        name: setLanguages('Должности', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование должность', '', ''),
                ...setAccessor('positionname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [PU_TYPES]: {
        name: setLanguages('Приборы учета (ПУ)', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование ПУ', '', ''),
                ...setAccessor('putypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [RELIABILITIES]: {
        name: setLanguages('Категория надежности', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование категории', '', ''),
                ...setAccessor('reliabilityname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [SECTORS]: {
        name: setLanguages('Районы города', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Название района', '', ''),
                ...setAccessor('sectorname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [SUB_TYPES]: {
        name: setLanguages('Виды субъектов'),
        maxWidth: '600px',
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(),
                ...setValidation()
            },
            {
                header: setLanguages('Название подтипов'),
                ...setAccessor('subtypename', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                ...setAccessor('subtypedescr', 300),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
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
    [TARIFF_GROUPS]: {
        name: setLanguages('Группы тарифов', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 70),
                ...setType(TYPE.ID, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)

            },
            {
                header: setLanguages('Наименование группы', '', ''),
                ...setAccessor('tariffgroupname', 250),
                ...setType(TYPE.STRING, true),
                ...setOrdering(true,true),
                ...setValidation(/^.{0,100}/,/^.+/)
            },
        ],
    },
    [TARIFFS]: {
        name: setLanguages('Тарифы', '', ''),
        maxWidth: '1200px',
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id',70),
                ...setOrdering(false, true),
                ...setType(TYPE.ID, true),
            },
            {
                header: setLanguages('Наименование тарифа',),
                ...setAccessor('tariffname',  250),
                ...setOrdering(true, true),
                ...setType(TYPE.STRING, true),
                ...setValidation(/^.{0,100}$/,/^.+$/),
            },
            {
                header: setLanguages('Норма',),
                ...setAccessor('norma',  150),
                ...setOrdering(true, true),
                ...setType(TYPE.NUMBER, true),
                ...setValidation(Number,/^\d{1,3}(.\d{1,2})?$/),
            },
            {
                header: setLanguages('Тариф',),
                ...setAccessor('tariff',  150),
                ...setOrdering(true, true),
                ...setType(TYPE.NUMBER, true),
                ...setValidation(Number,/^\d{1,3}(.\d{1,2})?$/),
            },
            {
                header: setLanguages('Действует с',),
                ...setAccessor('startdate', 150),
                ...setOrdering(true, true),
                ...setType(TYPE.DATE, true),
                ...setValidation('0000{-}00{-}00',/^\d{4}-\d{2}-\d{2}$/ ),
            },
            {
                header: setLanguages('Действует до',),
                ...setAccessor('enddate', 150),
                ...setOrdering(true, true),
                ...setType(TYPE.DATE, true),
                ...setValidation('0000{-}00{-}00',false ),
            },
            {
                header: setLanguages('Группа тарифа',),
                ...setAccessor('tariffgroup', 200),
                subPath: {path: TARIFF_GROUPS, accessor: 'tariffgroupname'},
                ...setType(TYPE.SUB_VALUE, true),
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
