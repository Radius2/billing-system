import {Button, IconButton, Toolbar, Tooltip, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import React, {useContext} from 'react';
import {LanguageContext} from '../../../App';
import {INTERFACE_LANGUAGE} from '../../../util/language';
import useStyle from '../handbookStyle';
import TooltipButton from '../../Shared/TooltipButton';

export default function ToolbarHeader({handbookName, deleteMod, selected, deleteButtonHandler, cancelButtonHandler, filterToggleHandler, addHandler, activeFilterMod, bindingVariant}) {
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
                    {bindingVariant ? <TooltipButton
                            tooltipTitle={INTERFACE_LANGUAGE.add[lang]}
                            actionHandler={addHandler}
                            size='medium'
                            icon={<AddIcon/>}
                        /> :
                        <TooltipButton
                            tooltipTitle={INTERFACE_LANGUAGE.filter[lang]}
                            icon={<FilterListIcon/>}
                            size='medium'
                            actionHandler={filterToggleHandler}
                            active={activeFilterMod}/>}
                </>
            }
        </Toolbar>
    )
}