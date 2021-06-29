import React, {useCallback, useMemo} from 'react';
import {TYPE} from '../../../util/handbook';
import AsyncInputSelect from './AsyncInputSelect';
import InputField from './InputField';

export default function Input({column, value, editing, setIsValidArray, setIsChangedArray, updateValues, lang}) {
    const {type} = column;
    const inputField = useCallback((props) => <InputField
        key={column.accessor}
        inputHandler={(newValue) => {
            console.log(newValue)
            updateValues(newValue, column)
        }}
        type={type}
        maskInput={column.maskInput}
        maskValidation={column.maskValidation}
        setIsValidArray={setIsValidArray}
        setIsChangedArray={setIsChangedArray}
        editing={editing}
        width={column.width}
        label={column.header[lang]}
        htmlId={column.accessor}
        options={column.options}
        value={value?.toString()}
        {...props}
    />, [updateValues])
    switch (type) {
        default:
        case TYPE.STRING:
        case TYPE.DATE:
            return inputField({});
        case TYPE.BOOLEAN:
            return inputField({value: value});
        case TYPE.NUMBER:
            return inputField({inputHandler: (newValue) => updateValues(+newValue, column)})
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
