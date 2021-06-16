import {ButtonBase, TableCell, TableHead, TableRow, Typography} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import clsx from 'clsx';
import React, {useContext} from 'react';
import {LanguageContext} from '../../App';
import FilterTextField from './FilterTextField';
import {ModContext} from './Handbook';
import useStyle from './style';

export default function HeadTable({columns, sortParams, sortParamsHandler, filterParamsHandler, activeFilter}) {
    const classes = useStyle();
    const {
        checkValid,
        setDefaultCurrentMod,
        editing
    } = useContext(ModContext);
    const {lang} = useContext(LanguageContext)

    function filterHandler(accessor, value) {
        setDefaultCurrentMod();
        filterParamsHandler(accessor, value)
    }

    return <TableHead>
        <TableRow className={classes.rowHeader}>
            {editing ? <TableCell style={{width: '46px'}}/> : null}
            {columns.map((column) => (
                <TableCell
                    style={{verticalAlign: 'top', width: column.width ?? 'auto'}}
                    key={column.accessor}>
                    <ButtonBase
                        disableTouchRipple
                        className={classes.sortButton}
                        disabled={!column.sort}
                        onClick={() => sortParamsHandler(column.accessor)}>
                        <Typography variant='subtitle2'>
                            {column.header[lang]}
                        </Typography>
                        <ArrowUpwardIcon
                            className={clsx(classes.sortButton__arrow, sortParams.ordering === column.accessor && [classes.sortButton__arrow_active, sortParams.desc && classes.sortButton__arrow_turn])}
                            fontSize='small'/>
                    </ButtonBase>
                    {activeFilter && column.filter ?
                        <FilterTextField checkValid={checkValid}
                                         filterHandler={(value) => filterHandler(column.accessor, value)}/>
                        : null}
                </TableCell>))}
        </TableRow>
    </TableHead>
}