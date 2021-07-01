import moment from 'moment';
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  HH_MM_FORMAT,
  INVERTED_DATE_FORMAT,
  INVERTED_DATE_TIME_FORMAT,
  TIME_ISO_FORMAT,
} from '../config/constants';



export const getClientDateFromString = (
  date = '',
  format = DATE_FORMAT
) =>
  date?.includes('-')
    ? moment(date, INVERTED_DATE_FORMAT).format(format)
    : date;

export const getClientDateTimeFromString = (
  date = '',
  format = DATE_FORMAT
) =>
  date?.includes('-')
    ? moment(date, INVERTED_DATE_TIME_FORMAT).format(DATE_FORMAT)
    : date;

export const getServerDateTimeFromString = (
  date = '',
  time = ''
) =>
  moment(`${date}T${time}`, DATE_TIME_FORMAT).format(INVERTED_DATE_TIME_FORMAT);

export const getServerDateFromString = (date = '') => {
  if (date instanceof Date) {
    return moment(date).format(INVERTED_DATE_FORMAT);
  }

  return date?.includes('.')
    ? moment(date, DATE_FORMAT).format(INVERTED_DATE_FORMAT)
    : date;
};

export const getCurrentServerDate = () =>
  moment(new Date()).format(INVERTED_DATE_FORMAT);

export const getClientTimeFromString = (
  time = ''
) => {
  if (!time) {
    return '';
  }

  if (String(time)?.includes('+')) {
    return moment(time, TIME_ISO_FORMAT).local().format(HH_MM_FORMAT);
  } else {
    return String(time);
  }
};

export const getServerTimeFromString = (time = '') =>
  moment(time, HH_MM_FORMAT).utc().format(TIME_ISO_FORMAT);
