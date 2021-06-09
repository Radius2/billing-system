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
                maxLength:30,
                filter:true,
                required: true,
                width: '200px',
            },
            {
                Header: setLanguages('Описание', 'Сипаттама', 'Description'),
                accessor: 'formtypedescr',
                maxLength:200,
                filter:true,
                required: false,

            },
        ],
    }
}