import React, {useCallback, useMemo} from 'react';
import {TYPE} from '../../../util/handbook';
import AsyncInputSelect from '../../Inputs/AsyncInputSelect';
import InputField from '../../Inputs/InputField';

export default function InputSwitch({column, value, editing, setIsValidArray, setIsChangedArray, updateValues, lang}) {
    const {type} = column;
    const inputField = useCallback(() => <InputField
        key={column.accessor}
        onChange={(newValue) => updateValues(newValue, column)}
        type={type}
        maskInput={column.maskInput}
        maskValidation={column.maskValidation}
        onIsValidChange={setIsValidArray}
        onIsChangedChange={setIsChangedArray}
        editing={editing}
        width={column.width}
        label={column.header[lang]}
        options={column.options}
        value={value}
    />, [updateValues])
    switch (type) {
        default:
        case TYPE.STRING:
        case TYPE.DATE:
        case TYPE.BOOLEAN:
        case TYPE.NUMBER:
            return inputField();
        case TYPE.SUB_VALUE:
            return (
                <AsyncInputSelect
                    key={column.accessor}
                    width={column.width}
                    editing={editing}
                    startValue={value}
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
