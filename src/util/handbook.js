import {AVAILABLE_LANGUAGE, setLanguages} from './language';

export const HANDBOOK_PATH = '/handbook/'

export const handbooks = {
    form_types: {
        name: setLanguages('Типы форм', 'Пішін түрлері', 'Form types'),
        path: 'handbooks/form_types',
        maxWidth: '600px',
        columns: [
            {
                Header: setLanguages('ID'),
                accessor: 'id',
                width: '70px',
                required: false,
            },
            {
                Header: setLanguages('Название формы', 'Форманың атауы', 'Form name'),
                accessor: 'formtypename',
                maxLength: 30,
                filter: true,
                required: true,
                width: '200px',
            },
            {
                Header: setLanguages('Описание', 'Сипаттама', 'Description'),
                accessor: 'formtypedescr',
                maxLength: 200,
                filter: true,
                required: false,

            },
        ],
    },
    sub_types: {
        name: setLanguages('Подтипы', 'Кіші типтер', 'Subtypes'),
        path: 'handbooks/sub_types',
        maxWidth: '600px',
        columns: [
            {
                Header: setLanguages('ID'),
                accessor: 'id',
                width: '70px',
                required: false,
            },
            {
                Header: setLanguages('Название подтипов', 'Ішкі түр атауы', 'Subtype name'),
                accessor: 'subtypename',
                maxLength: 30,
                filter: true,
                required: true,
                width: '200px',
            },
            {
                Header: setLanguages('Описание', 'Сипаттама', 'Description'),
                accessor: 'subtypedescr',
                maxLength: 200,
                filter: true,
                required: false,

            },
        ],
    }
}

export function getHandbooks() {
    const handbooksList = []
    Object.keys(handbooks).forEach((title) => {
            const allName = AVAILABLE_LANGUAGE.map(lang => handbooks[title].name[lang]).join('/')
            handbooksList.push({
                header: (lang)=>`${handbooks[title].name[lang]}`,
                name: allName,
                path: HANDBOOK_PATH + title
            })
        }
    )
    return handbooksList
}
