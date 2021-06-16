import {AVAILABLE_LANGUAGE, setLanguages} from './language';

export const HANDBOOK_PATH = '/handbook/'

const TYPE = {
    ID: 'id',
    STRING: 'string',
    NUMBER: 'number',
    SUB_VALUE: 'subValue'
}

function setAccessor(accessor, maxLength, widthColumn, type, required = false, filter = false, sort = false) {
    return {accessor, maxLength, width: widthColumn + 'px', type, required, filter, sort}
}

//...setAccessor('id',0,70,TYPE.ID,false,false,true),
export const handbooks = {
    banks: {
        name: setLanguages('Банки', '', ''),
        maxWidth: '800px',
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 0, 70, TYPE.ID, false, false, true),
            },
            {
                header: setLanguages('Название банка', '', ''),
                ...setAccessor('bankname', 50, 200, TYPE.STRING, true, true, true),
            },
            {
                header: setLanguages('МФО', '', ''),
                ...setAccessor('mfo', 50, 200, TYPE.STRING, true, true, true),
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                ...setAccessor('bankdescr', null, null, TYPE.STRING, false, true, true),
            },
        ],
    },
    form_types: {
        name: setLanguages('Типы форм', 'Пішін түрлері', 'Form types'),
        maxWidth: '600px',
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 0, 70, TYPE.ID, false, false, true),
            },
            {
                header: setLanguages('Название формы', 'Форманың атауы', 'Form name'),
                ...setAccessor('formtypename', 30, 200, TYPE.STRING, true, true, true),
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                ...setAccessor('formtypedescr', 200, null, TYPE.STRING, false, true, true),
            },
        ],
    },
    org_info: {
        name: setLanguages('Организации', '', ''),
        maxWidth: '1000px',
        columns: [
            {
                header: setLanguages('ID'),
                accessor: 'id',
                width: '70px',
                type: TYPE.ID,
                required: false,
            },
            {
                header: setLanguages('Название', '', ''),
                accessor: 'oiname',
                maxLength: 30,
                filter: true,
                type: TYPE.STRING,
                required: true,
                width: '150px',
            },
            {
                header: setLanguages('Полное название', '', ''),
                accessor: 'oifname',
                maxLength: 30,
                filter: true,
                type: TYPE.STRING,
                required: true,
            },
        ],
    },
    positions: {
        name: setLanguages('Позиции', '', ''),
        maxWidth: '400px',
        columns: [
            {
                header: setLanguages('ID', '', ''),
                ...setAccessor('id', 0, 70, TYPE.ID, false, false, true),
            },
            {
                header: setLanguages('Название позиции', '', ''),
                ...setAccessor('positionname', null, null, TYPE.STRING, true, true, true),
            },
        ],
    },
    sub_types: {
        name: setLanguages('Подтипы', 'Кіші типтер', 'Subtypes'),
        maxWidth: '600px',
        columns: [
            {
                header: setLanguages('ID'),
                ...setAccessor('id', 0, 70, TYPE.ID, false, false, true)
            },
            {
                header: setLanguages('Название подтипов', 'Ішкі түр атауы', 'Subtype name'),
                ...setAccessor('subtypename', 30, 200, TYPE.STRING, true, true, true),
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                ...setAccessor('subtypedescr', 200, null, TYPE.STRING, false, true, true),
            },
        ],
    },
    subjects: {
        name: setLanguages('Субъекты', '', ''),
        maxWidth: '600px',
        columns: [
            {
                header: setLanguages('ID'),
                accessor: 'id',
                width: '70px',
                type: TYPE.ID,
                required: false,
            },
            {
                header: setLanguages('Название подтипов', 'Ішкі түр атауы', 'Subtype name'),
                accessor: 'subtypename',
                maxLength: 30,
                filter: true,
                type: TYPE.STRING,
                required: true,
                width: '200px',
            },
            {
                header: setLanguages('Описание', 'Сипаттама', 'Description'),
                accessor: 'subtypedescr',
                maxLength: 200,
                filter: true,
                type: TYPE.STRING,
                required: false,

            },
        ],
    },
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
