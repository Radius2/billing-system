import {useCallback, useContext, useState, useEffect} from 'react';
import * as api from '../../api/api';
import {LanguageContext} from '../../App';
import {INTERFACE_DIALOG} from '../../util/language';

export default function useData({handbookName, pageSize = 20, filterParams, snackbarHandler, sortParams, setDefaultCurrentMod, selectedRows, setErrMessage}) {
    const [data, setData] = useState([]); //данные формы
    const [hasMore, setHasMore] = useState(false) // внутренняя безопасность
    const [loading, setLoading] = useState(false) // режим загрузки
    const [showInfinityScrollRow, setShowInfinityScrollRow] = useState(false); // пустая строка внизу тела таблицы
    const [editing, setEditing] = useState(true);
    const {lang} = useContext(LanguageContext)

    useEffect(() => {
        setEditing(true);
        setData([])
    }, [handbookName])

    const getElements = useCallback((page) => {
        setLoading(true);
        api.getHandbook(handbookName, {page, page_size: pageSize, ...filterParams, ...sortParams})
            .then((resp) => {
                const currentDataLength = (page === 1) ? 0 : data.length
                setHasMore(resp.data.count > (resp.data.values.length + currentDataLength) && resp.data.values.length === pageSize)
                setData(prev => {
                    return (page === 1) ? resp.data.values : [...prev, ...resp.data.values]
                });
            })
            .catch((err) => {
                setHasMore(false);
                setErrMessage(err.message)
            })
            .finally(() => {
                setLoading(false);
                setShowInfinityScrollRow(true);
            })
    }, [sortParams, filterParams, sortParams])

    //сохранить новую строку в БД  и запросить новую строку в локальный справочник
    const addRow = useCallback((payload) => {
        api.addElementHandbook(handbookName, payload)
            .then((resp) => {
                return api.getElementHandbook(handbookName, resp.data.id)
            })
            .then(resp => {
                setDefaultCurrentMod()
                snackbarHandler({error: false, mess: INTERFACE_DIALOG.successSaveModal[lang]});
                (setData(prev => ([...prev, resp.data])));
            })
            .catch(err => setErrMessage(err.message))
    }, [handbookName, setDefaultCurrentMod, lang, snackbarHandler])

    //обновить строку и получить перезаписанную сткоку из БД
    const updateRow = useCallback((payload, index) => {
        api.updElementHandbook(handbookName, payload)
            .then((resp) => api.getElementHandbook(handbookName, resp.data.id))
            .then(resp => {
                if (index === selectedRows[0]) setDefaultCurrentMod()
                setData(prev => {
                    prev[index] = resp.data;
                    return [...prev]
                })
                snackbarHandler({error: false, mess: INTERFACE_DIALOG.successSaveModal[lang]});
            })
            .catch(err => setErrMessage(err.message))
    }, [handbookName, setDefaultCurrentMod, lang, snackbarHandler, selectedRows])


    //удалить строку локально и из БД
    const deleteRows = useCallback(() => {
            const ids = selectedRows.map((index) => data[index].id);
            api.delElementsHandbook(handbookName, ids)
                .then(resp => {
                    setData(prev => {
                        snackbarHandler({error: false, mess: INTERFACE_DIALOG.successDeleteModal[lang]})
                        const newArr = [...prev];
                        selectedRows.sort((a, b) => b - a).forEach(index => {
                            if (resp.data.ids?.includes(data[index].id)) newArr.splice(index, 1)
                        })
                        return newArr
                    })
                })
                .catch(err => setErrMessage(err.message))
                .finally(setDefaultCurrentMod)
        }
        , [handbookName, setDefaultCurrentMod, lang, snackbarHandler, selectedRows, console]
    )

    return {
        loading, deleteRows, getElements, addRow, updateRow, data, hasMore, showInfinityScrollRow, editing
    }
}