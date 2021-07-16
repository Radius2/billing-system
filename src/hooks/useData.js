import {useCallback, useContext, useState, useEffect} from 'react';
import * as api from '../api/api';
import {LanguageContext} from '../App';
import {INTERFACE_DIALOG} from '../util/language';

export default function useData({formName, pageSize = 20, snackbarHandler, setDefaultCurrentMod, selectedRows, setErrMessage}) {
    const [data, setData] = useState([]); //данные формы
    const [hasMore, setHasMore] = useState(false) // внутренняя безопасность
    const [page, setPage] = useState(1);//страниза пагинации
    const [loading, setLoading] = useState(true) // режим загрузки
    const [showInfinityScrollRow, setShowInfinityScrollRow] = useState(false); // пустая строка внизу тела таблицы
    const [editing, setEditing] = useState(true);
    const [filterParams, setFilterParams] = useState({}) //фильтр квери параметры запроса элементов справочника
    const [sortParams, setSortParams] = useState({desc: 0, ordering: 'id'})//квери параметр сортировки
    const [activeFilter, setActiveFilter] = useState(false); //активный фильтр
    const [reloadData, setReloadData] = useState(false); //перезагрузка данных
    const {lang} = useContext(LanguageContext)

    const getElements = useCallback((page) => {
        setLoading(true);
        api.getHandbook(formName, {page, page_size: pageSize, ...filterParams, ...sortParams})
            .then((resp) => {
                const currentDataLength = (page === 1) ? 0 : data.length
                const isHasMore = resp.data.count > (resp.data.values.length + currentDataLength) && resp.data.values.length === pageSize
                setHasMore(isHasMore);
                setShowInfinityScrollRow(isHasMore);
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
            })
    }, [sortParams, filterParams, sortParams,])

    //сохранить новую строку в БД  и запросить новую строку в локальный справочник
    const addRow = useCallback((payload) => {
        api.addElementHandbook(formName, payload)
            .then((resp) => {
                return api.getElementHandbook(formName, resp.data.id)
            })
            .then(resp => {
                setDefaultCurrentMod()
                snackbarHandler({error: false, mess: INTERFACE_DIALOG.successSaveModal[lang]});
                (setData(prev => ([...prev, resp.data])));
            })
            .catch(err => setErrMessage(err.message))
    }, [formName, setDefaultCurrentMod, lang, snackbarHandler])

    //обновить строку и получить перезаписанную сткоку из БД
    const updateRow = useCallback((payload, index) => {
        api.updElementHandbook(formName, payload)
            .then((resp) => api.getElementHandbook(formName, resp.data.id))
            .then(resp => {
                if (index === selectedRows[0]) setDefaultCurrentMod()
                setData(prev => {
                    prev[index] = resp.data;
                    return [...prev]
                })
                snackbarHandler({error: false, mess: INTERFACE_DIALOG.successSaveModal[lang]});
            })
            .catch(err => setErrMessage(err.message))
    }, [formName, setDefaultCurrentMod, lang, snackbarHandler, selectedRows])


    //удалить строку локально и из БД
    const deleteRows = useCallback(() => {
            const ids = selectedRows.map((index) => data[index].id);
            api.delElementsHandbook(formName, ids)
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
                .finally(()=> {
                    setDefaultCurrentMod()
                })
        }
        , [formName, setDefaultCurrentMod, lang, snackbarHandler, selectedRows, console]
    )

    const getMore = useCallback(() => {
        if (hasMore) setPage(prev => prev + 1)
    }, [hasMore]);

    const sortParamsHandler = useCallback((accessor) => {
        setSortParams((sortParams) => {
            return sortParams.ordering !== accessor ? {ordering: accessor, desc: 0}
                : {ordering: accessor, desc: sortParams.desc === 0 ? 1 : 0}
        })
    }, [])

    const filterParamsHandler = useCallback((accessor, value) => {
        setFilterParams(prev => ({
            ...prev,
            [accessor]: value
        }))
    }, [])

    useEffect(() => {
        setEditing(true); // debug value of parameter
        setFilterParams({});
        setSortParams({desc: 0, ordering: 'id'});
        setShowInfinityScrollRow(false);
        setData([])
    }, [formName])

    //получение данных справочника при загрузке компонента
    useEffect(() => {
        setLoading(true);
        setPage(1);
        const timer = setTimeout(() => {
            getElements(1);
        }, 300);
        return () => {
            clearTimeout(timer);
        }
    }, [formName, filterParams, sortParams, getElements])

    //получение данных справочника при загрузке компонента
    useEffect(() => {
        if (!reloadData) return
        setPage(1);
        setReloadData(false);
        getElements(1);
    }, [reloadData])

    useEffect(() => {
            if (page > 1) getElements(page)
        }
        , [page])

    useEffect(() => {
        if (!activeFilter) {
            setFilterParams(prev => Object.keys(prev).length === 0 ? prev : {})
        }
    }, [activeFilter])

    return {
        loading,
        deleteRows,
        addRow,
        updateRow,
        data,
        showInfinityScrollRow,
        editing,
        getMore,
        sortParams,
        sortParamsHandler,
        filterParamsHandler,
        activeFilter,
        setActiveFilter,
        setReloadData
    }
}