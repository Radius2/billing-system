import React, {useCallback, useMemo} from 'react';
import {TYPE} from '../../../util/handbook';
import AsyncInputSelect from '../../Inputs/AsyncInputSelect';
import InputField from '../../Inputs/InputField';

export default function InputSwitch({column, value, editing, setIsValidArray, setIsChangedArray, updateValues, lang}) {
    const {type} = column;
    const inputField = useCallback((props) => <InputField
        key={column.accessor}
        onChange={(newValue) => updateValues(newValue, column)}
        type={type}
        maskInput={column.maskInput}
        maskValidation={column.maskValidation}
        onIsValidChange={setIsValidArray}
        onIsChangedChange={setIsChangedArray}
        editing={editing}
        width={column.width}
        upperCase={!column.lowerCase}
        label={column.header[lang]}
        options={column.options}
        value={value}
        {...props}
    />, [updateValues])
    switch (type) {
        default:
        case TYPE.STRING:
        case TYPE.DATE:
        case TYPE.BOOLEAN:
        case TYPE.NUMBER:
            return inputField({});
        case TYPE.SUB_SUB_VALUE:
            return inputField({
                value: value[column?.subSubPath?.accessor]?.[column.subSubPath.subAccessor],
                editing: false
            });
        case TYPE.SUB_VALUE:
            return (
                <AsyncInputSelect
                    key={column.subPath.accessor}
                    width={column.width}
                    editing={editing}
                    value={value}
                    onIsValidChange={setIsValidArray}
                    onIsChangedChange={setIsChangedArray}
                    subPath={column.subPath}
                    label={column.header[lang]}
                    onChange={(newValue) => updateValues(newValue, column)}
                />)
        case TYPE.ID:
            return null
    }
}
