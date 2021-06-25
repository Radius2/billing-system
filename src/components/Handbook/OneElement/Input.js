import React from 'react';
import {TYPE} from '../../../util/handbook';
import AsyncInputSelect from './AsyncInputSelect';
import InputField from './InputField';

export default function Input({column, value, editing, setIsValidArray, setIsChangedArray, updateValues, lang}) {
    const {type, accessor} = column;
    switch (type) {
        default:
        case TYPE.STRING:
        case TYPE.BOOLEAN:
        case TYPE.DATE:
            return (
                <InputField
                    key={column.accessor}
                    type={type}
                    maskInput={column.maskInput}
                    maskValidation={column.maskValidation}
                    setIsValidArray={setIsValidArray}
                    setIsChangedArray={setIsChangedArray}
                    editing={editing}
                    width={column.width}
                    label={column.header[lang]}
                    inputHandler={(newValue) => updateValues(newValue, column)}
                    htmlId={column.accessor}
                    options={column.options}
                    value={value}
                >
                </InputField>
            );
        case TYPE.SUB_VALUE:
            return (
                <AsyncInputSelect
                    key={column.accessor}
                    width={column.width}
                    editing={editing}
                    startValue={value}
                    setIsValidArray={setIsValidArray}
                    setIsChangedArray={setIsChangedArray}
                    subPath={column.subPath}
                    label={column.header[lang]}
                    selectHandler={(newValue) => updateValues(newValue, column)}
                />)
        case TYPE.ID:
            return null
    }
}
