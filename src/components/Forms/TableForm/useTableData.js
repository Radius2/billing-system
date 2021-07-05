import {useCallback, useState, useEffect} from 'react';
import * as api from '../../../api/api';


export default function useTableData({formName, pageSize = 20, setErrMessage}) {
    const [data, setData] = useState([]); //данные формы
    const [hasMore, setHasMore] = useState(false) // внутренняя безопасность
    const [page, setPage] = useState(1);//страниза пагинации
    const [loading, setLoading] = useState(false) // режим загрузки
    const [showInfinityScrollRow, setShowInfinityScrollRow] = useState(false); // пустая строка внизу тела таблицы
    const [editing, setEditing] = useState(true);
    const [filterParams, setFilterParams] = useState({}) //фильтр квери параметры запроса элементов справочника
    const [sortParams, setSortParams] = useState({desc: 0, ordering: 'id'})//квери параметр сортировки
    const [activeFilter, setActiveFilter] = useState(false); //активный фильтр
    const [reloadData, setReloadData] = useState(false); //перезагрузка данных

    const getElements = useCallback((page) => {
        setLoading(true);
        ////////////////////////////////////////////////////////
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
        return undefined; //отмена подгрузки
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
        data,
        loading,
        editing,
        getMore,
        sortParams,
        sortParamsHandler,
        filterParamsHandler,
        activeFilter,
        setActiveFilter,
        setReloadData,
        showInfinityScrollRow,
    }
}