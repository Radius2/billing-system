import SubjectFormOneElement from '../../components/OneElement/SubjectFormOneElement';
import {handbooks} from '../handbookStructure/handbook';
import {TYPE} from '../../util/constant';
import {
    setAccessor,
    setType,
    setValidation,
    setOrdering,
    setSubPath,
} from '../../util/constructorFunction';
import {setLanguages} from '../../util/language';

export const FORM_NAME = 'subjects';

const onlyWord = '[A-zА-яЁё]';


export const ACCESSORS = {
    ID: 'id',
    SUB_ACC_NUMBER: 'subaccnumber',
    SUB_NAME: 'subname',
    SUB_BIN: 'subbin',
    SUB_START: 'substart',
    SUB_HEAD_NAME: 'subheadname',
    SUB_HEAD_POS: 'subheadpos',
    SUB_ACC_NAME: 'subaccname',
    SUB_ACC_POS: 'subaccpos',
    SUB_PHYS: 'subphys',
    SUB_TYPE: 'subtype',
    SUB_ADDR: 'subaddr',
    SUB_PHONE: 'subphone',
    SUB_DESCR: 'subdescr',

};

export const str = {
    [ACCESSORS.ID]: {
        header: setLanguages('ID'),
        ...setAccessor('id', 70),
        ...setOrdering(false, true),
        ...setType(TYPE.ID, true),
    },
    [ACCESSORS.SUB_ACC_NUMBER]: {
        header: setLanguages('Номер лицевого счета'),
        ...setAccessor('subaccnumber', 250),
        ...setOrdering(true, true),
        ...setType(TYPE.STRING, true),
        ...setValidation(/^\d{1,10}$/, /^\d{10}$/),
    },
    [ACCESSORS.SUB_NAME]: {
        header: setLanguages('Наименование'),
        ...setAccessor('subname', 200, true),
        ...setOrdering(true, true),
        ...setType(TYPE.STRING, true),
        ...setValidation(/^.+$/, /^.+$/),
    },
    [ACCESSORS.SUB_BIN]: {
        header: setLanguages('БИН'),
        ...setAccessor('subbin', 250),
        ...setOrdering(true, true),
        ...setType(TYPE.STRING, true),
        ...setValidation(/^\d{0,12}$/, /^\d{12}$/),
    },
    [ACCESSORS.SUB_START]: {
        header: setLanguages('Действует с'),
        ...setAccessor('substart', 200),
        ...setOrdering(true, true),
        ...setType(TYPE.DATE, true),
        ...setValidation('0000{-}00{-}00', /^\d{4}-\d{2}-\d{2}$/),
    },
    [ACCESSORS.SUB_HEAD_NAME]: {
        header: setLanguages('ФИО руководителя'),
        ...setAccessor('subheadname', 350, true),
        ...setType(TYPE.STRING, false),
        ...setValidation(new RegExp(`^(${onlyWord}{1,100}(\\s?|\\.?)){0,3}$`), /^.+$/),
    },
    [ACCESSORS.SUB_HEAD_POS]: {
        header: setLanguages('Должность руководителя'),
        ...setAccessor('subheadpos', 250),
        ...setType(TYPE.SUB_VALUE, false),
        ...setSubPath(() => handbooks.positions, 'positionname'),
        ...setValidation(/^.{0,100}$/, /^.+$/),
    },
    [ACCESSORS.SUB_ACC_NAME]: {
        header: setLanguages('ФИО бухгалтера'),
        ...setAccessor('subaccname', 350, true),
        ...setOrdering(true, true),
        ...setType(TYPE.STRING, false),
        ...setValidation(new RegExp(`^(${onlyWord}{1,100}(\\s?|\\.?)){0,3}$`), false),
    },
    [ACCESSORS.SUB_ACC_POS]: {
        header: setLanguages('Должность бухгалтера'),
        ...setAccessor('subaccpos', 250),
        ...setType(TYPE.SUB_VALUE, false),
        ...setSubPath(() => handbooks.positions, 'positionname'),
        ...setValidation(/^.{0,100}$/, false),
    },
    [ACCESSORS.SUB_PHYS]: {
        header: setLanguages('Вид лица'),
        ...setAccessor('subphys', 200),
        options: ['Юрлицо', 'Физлицо'],
        ...setType(TYPE.BOOLEAN, false),
        ...setValidation('/.+/', true)
    },
    [ACCESSORS.SUB_TYPE]: {
        header: setLanguages('Тип организации'),
        ...setAccessor('subtype', 200),
        ...setSubPath(() => handbooks.sub_types, 'subtypename'),
        ...setType(TYPE.SUB_VALUE, false),
        ...setValidation(/^.{0,100}$/, /^.+$/),
    },
    [ACCESSORS.SUB_ADDR]: {
        header: setLanguages('Адрес'),
        ...setAccessor('subaddr', 300),
        ...setType(TYPE.STRING, false),
        ...setValidation(/^.{0,100}$/, /^.+$/),
    },
    [ACCESSORS.SUB_PHONE]: {
        header: setLanguages('Номер телефона'),
        ...setAccessor('subphone', 300),
        ...setType(TYPE.STRING, false),
        ...setValidation('+{7}(000)000-0000', /^\d{11}$/),
    },
    [ACCESSORS.SUB_DESCR]: {
        header: setLanguages('Описание'),
        ...setAccessor('subdescr', 300, true),
        ...setType(TYPE.STRING, false),
        ...setValidation(/^.{0,200}$/, false),
    },
};

export const structureTable = {
    name: setLanguages('Субъекты', '', ''),
    maxWidth: '1050px',
    noDeleteButton: true,
    formName: FORM_NAME,
    oneElementComponent: SubjectFormOneElement,
    columns: [
        {...str[ACCESSORS.ID]},
        {...str[ACCESSORS.SUB_ACC_NUMBER]},
        {...str[ACCESSORS.SUB_NAME]},
        {...str[ACCESSORS.SUB_BIN]},
        {...str[ACCESSORS.SUB_START]},
    ],
};
