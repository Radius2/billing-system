import {setAccessor, setBreak, setType, TYPE} from './handbook';
import {setLanguages} from './language';

export const subjects = {
    name: setLanguages('История изменения субъекта'),
    width: '1350px',
    columns: [
        // {
        //     ...setLanguages('ID'),
        //     ...setAccessor('sub_id', 150),
        //     ...setType(TYPE.ID, true),
        // },
        {
            header: setLanguages('Номер лицевого счета'),
            ...setAccessor('sub_account', 250),
            ...setType(TYPE.STRING, true),
        },
        {
            header: setLanguages('Наименование'),
            ...setAccessor('sub_name', 200),
            ...setType(TYPE.STRING, true),
        },
        {
            header: setLanguages('БИН'),
            ...setAccessor('bin', 250),
            ...setType(TYPE.STRING, true),
        },
        {
            header: setLanguages('Действует с'),
            ...setAccessor('created', 200),
            ...setType(TYPE.DATE, true),
        },
        {
            header: setLanguages('Действует до'),
            ...setAccessor('closed', 200),
            ...setType(TYPE.DATE, true),
        },
        {
            header: setLanguages('ФИО руководителя'),
            ...setAccessor('head_name', 350),
            ...setType(TYPE.STRING, false),
        },
        {
            header: setLanguages('Должность Руководителя'),
            ...setAccessor('hname', 250),
            ...setType(TYPE.STRING, false),
            ...setBreak()
        },
        {
            header: setLanguages('ФИО бухгалтера'),
            ...setAccessor('acc_name', 350),
            ...setType(TYPE.STRING, false),
        },
        {
            header: setLanguages('Должность бухгалтера'),
            ...setAccessor('accname', 250),
            ...setType(TYPE.STRING, false),
            ...setBreak()
        },
        {
            header: setLanguages('Вид лица'),
            ...setAccessor('sub_phys', 200),
            ...setType(TYPE.BOOLEAN, false),
            options: ['Юрлицо', 'Физлицо',],
        },
        {
            header: setLanguages('Тип оганизации'),
            ...setAccessor('type_name', 200),
            ...setType(TYPE.STRING, false),
        },
        {
            header: setLanguages('Адрес'),
            ...setAccessor('sub_address', 300),
            ...setType(TYPE.STRING, false),
        },
        {
            header: setLanguages('Номер телефон'),
            ...setAccessor('sub_phone', 300),
            ...setType(TYPE.STRING, false),
        },
        {
            header: setLanguages('Описание'),
            ...setAccessor('sub_descr', 300),
            ...setType(TYPE.STRING, false),
        },
    ]
}
