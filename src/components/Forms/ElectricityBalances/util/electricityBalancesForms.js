import {setLanguages} from '../../../../util/language';
import {setAccessor, setOrdering, setType, setValidation, TYPE} from '../../../../util/handbook';

export const ELECTRICITY_BALANCES_PATH = '/electricity_balances/';

export const SERTIFICATION = 'certification_of_accounting_point';
export const REGISTRATION = 'registration_an_accounting_point';
const USERS = 'users'

const onlyWord = '[A-zА-яЁё]';


export const electricityBalances = {
  [SERTIFICATION]: {
    name: setLanguages('Аттестация точки учета', '', ''),
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
  [REGISTRATION]: {
    name: setLanguages('Регистрация точек учета', '', ''),
    maxWidth: '800px',
    columns: [
      {
        header: setLanguages('Дата',),
        ...setAccessor('date', 170),
        ...setOrdering(true, true),
        ...setType(TYPE.DATE, true),
        ...setValidation('0000{-}00{-}00',/^\d{4}-\d{2}-\d{2}$/ ),
      },
      {
        header: setLanguages('Номер', '', ''),
        ...setAccessor('documentnumber', 140),
        ...setType(TYPE.NUMBER, true),
        ...setOrdering(true,true),
        ...setValidation(/^.{0,100}/,/^.+/)
      },
      {
        header: setLanguages('Автор', '', ''),
        ...setAccessor('author', 265),
        subPath: {path: USERS, accessor: 'tariffgroupname'},
        ...setType(TYPE.SUB_VALUE, true),
        ...setOrdering(true,true)
      },
      {
        header: setLanguages('Дата ввода',),
        ...setAccessor('dateofentry', 170),
        ...setOrdering(true, true),
        ...setType(TYPE.DATE, true),
        ...setValidation('0000{-}00{-}00',/^\d{4}-\d{2}-\d{2}$/ ),
      },
    ],
  }
};