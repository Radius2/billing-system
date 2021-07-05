//Установка имени параметра и ширины колонки
import {setLanguages} from '../../../util/language';

export function setAccessor(accessor, widthColumn, lowerCase = false) {
    return {accessor: accessor.toLowerCase(), width: widthColumn + 'px', lowerCase}
}

//Установка маски ввода согласно  react-imask и валидации регул выражением
export function setValidation(maskInput = /\.{0,200}/, maskValidation = /\.{0,200}/, additionMaskInput) {
    return {
        maskInput: {
            mask: maskInput,
            ...additionMaskInput
        },
        maskValidation
    }
}

//Установка признаков фильтрации и сортировки по параметру
export function setOrdering(filter = false, sort = false) {
    return {filter, sort}
}

//Установка типа и признака отображения параметра в главной таблице
export function setType(type, mainValue = true) {
    return {type, mainValue}
}

//Установка переноса строки при валидации
export function setBreak() {
    return {break: true}
}

export function setHeader(RU, KZ, EN) {
    return {header: setLanguages(RU, KZ, EN)}
}

export function setSubPath(path, accessor) {
    return {subPath: {path, accessor}}
}