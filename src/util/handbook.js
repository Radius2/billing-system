import {setLanguages} from './language';

export const handbooks = {
    form_types: {
        maxWidth: '600px',
        name: setLanguages('Типы форм','Пішін түрлері','Form types'),
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
                filter:true,
                required: true,
                width: '200px',
            },
            {
                Header: setLanguages('Описание', 'Сипаттама', 'Description'),
                accessor: 'formtypedescr',
                filter:true,
                required: false,

            },
        ],
    }
}