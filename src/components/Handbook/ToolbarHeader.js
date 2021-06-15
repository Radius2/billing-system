import {Button, IconButton, Toolbar, Tooltip, Typography} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import React, {useContext} from 'react';
import {LanguageContext} from '../../App';
import {INTERFACE_LANGUAGE} from '../../util/language';
import useStyle from './style';

export default function ToolbarHeader({handbookName, deleteMod, selected, deleteButtonHandler, cancelButtonHandler, filterToggleHandler, activeFilterMod}) {
    const classes = useStyle();
    const {lang} = useContext(LanguageContext);
    return (
        <Toolbar
            className={clsx(classes.toolbar, deleteMod && classes.rowDelete)}>
            {deleteMod ?
                <>
                    <Typography variant='h6'>
                        {selected} {INTERFACE_LANGUAGE.selected[lang]}
                    </Typography>
                    <Button onClick={cancelButtonHandler}>
                        {INTERFACE_LANGUAGE.cancel[lang]}
                    </Button>
                    <Tooltip title={INTERFACE_LANGUAGE.delete[lang]}>
                        <IconButton aria-label="delete " onClick={deleteButtonHandler}>
                            <DeleteForeverIcon/>
                        </IconButton>
                    </Tooltip>
                </>
                : <>
                    <Typography
                        variant='h6'>
                        {handbookName}
                    </Typography>
                    <Tooltip title={INTERFACE_LANGUAGE.filter[lang]}>
                        <IconButton onClick={filterToggleHandler} aria-label="filter list">
                            <FilterListIcon
                                color={activeFilterMod ? 'primary' : 'inherit'}/>
                        </IconButton>
                    </Tooltip>
                </>
            }
        </Toolbar>
    )
}