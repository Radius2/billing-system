import {TableCell, TableRow} from '@material-ui/core';
import React, {useCallback, useRef} from 'react';


export default function InfiniteScrollBorder({uploadMoreFunction, loading, colSpan}) {
    const observer = useRef() // ссылка на пустую последнюю строку

    const lastRow = useCallback(node => {
        if (loading) return null
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                uploadMoreFunction()
            }
        })
        if (node) observer.current.observe(node)
    }, [loading])

    return (
        <TableRow ref={lastRow}>
            <TableCell colSpan={colSpan}/>
        </TableRow>)
}
