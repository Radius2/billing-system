import React, {useCallback, useContext, useEffect, useState} from 'react';
import * as api from '../api/api';
import {LanguageContext} from '../App';
import {changeReduce, newElement, validationReduce} from '../util/formFunctions';
import InputSwitch from '../components/Inputs/InputSwitch';

export default function useOneElement({formName, id, str, preparedValue, submitHandler, cancelHandler, index}) {
    const {lang} = useContext(LanguageContext);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(true);
    const [isValidArray, setIsValidArray] = useState({});
    const [isChangedArray, setIsChangedArray] = useState({});
    const [isValidElement, setIsValidElement] = useState(true);
    const [isChangedElement, setIsChangedElement] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [idElement, setIdElement] = useState(id);
    const addMode = idElement.toUpperCase() === 'ADD';

    const getElementData = useCallback(() => {
        setLoading(true);
        api
            .getElementHandbook(formName, +idElement)
            .then(({data}) => setData(data))
            .catch(() => console.log('error'))
            .finally(() => setLoading(false));
    }, [formName, idElement]);

    useEffect(() => {
        setIsValidElement(validationReduce(isValidArray));
    }, [isValidArray]);

    useEffect(() => {
        setIsChangedElement(changeReduce(isChangedArray));
    }, [isChangedArray]);

    useEffect(() => {
        if (addMode || idElement === 0) {
            setLoading(false);
            return setData(newElement(str, preparedValue));
        }
        getElementData();
    }, [formName, idElement]);

    function addElement() {
        api
            .addElementHandbook(formName, data)
            .then(resp => {
                setIdElement(resp.data.id.toString());
                submitHandler({...data, ...resp.data}, 'add')
            })
            .catch(() => console.log('err'));
    }

    function updateElement() {
        api
            .updElementHandbook(formName, data)
            .then(resp => {
                getElementData();
                setLoading(true);
            })
            .then(() => {
                setLoading(false)
                submitHandler(data, index)
            })
            .catch(() => console.log('err'));
    }

    function deleteElement() {
        api
            .delElementsHandbook(formName, [+idElement])
            .then(resp => {
                submitHandler('delete', index);
                cancelHandler();
            })
            .then(() => setLoading(false))
            .catch(() => console.log('err'));
    }


    function closeElement(closed) {
        api
            .delElementHandbookWithTime(formName, idElement, closed)
            .then(resp => {
                submitHandler(data, index)
                cancelHandler();
            })
            .then(() => setLoading(false))
            .catch(() => console.log('err'));
    }

    function actionButtonHandler() {
        addMode ? addElement() : updateElement();
    }

    function closeHandler() {
        return isChangedElement ? setOpenDialog(true) : cancelHandler();
    }

    const input = useCallback(
        (accessor, width, noEditing) => {
            if (loading) return undefined;
            const column = str[accessor];
            const value = data[column.accessor];

            return (
                <InputSwitch
                    key={column.accessor + (column.subPath?.accessor ?? '')}
                    width={width || '350px'}
                    column={column}
                    value={value}
                    lang={lang}
                    updateValues={value => {
                        setData(prev => ({...prev, [column.accessor]: value}));
                    }}
                    editing={editing && !column.noEditing && !noEditing}
                    setIsValidArray={value => setIsValidArray(prev => ({...prev, [column.accessor]: !!value}))}
                    setIsChangedArray={value => setIsChangedArray(prev => ({...prev, [column.accessor]: !!value}))}
                />
            );
        },
        [editing, lang, setIsValidArray, data, str, loading]
    );

    return {
        data,
        idElement,
        setData,
        closeElement,
        deleteElement,
        loading,
        editing,
        input,
        isValidElement,
        isChangedElement,
        closeHandler,
        addMode,
        openDialog,
        setOpenDialog,
        actionButtonHandler,
    };
}
