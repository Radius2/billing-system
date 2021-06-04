import {setLanguages} from './language';

export const handbooks = {
    form_types: {
        maxWidth: '550px',
        name: setLanguages('Типы форм','','Form types'),
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
                required: true,
            },
            {
                Header: setLanguages('Описание', 'Сипаттама', 'Description'),
                accessor: 'formtypedescr',
                width: '50%',
                required: false,
            },
        ],
    }
}