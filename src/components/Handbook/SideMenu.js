import {Box, IconButton, Tooltip} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, {useContext} from 'react';
import {LanguageContext} from '../../App';
import {INTERFACE_LANGUAGE} from '../../util/language';

const iconButton = [
    {name: 'delete', icon: <DeleteForeverIcon fontSize='default'/>},
    {name: 'add', icon: <AddIcon fontSize='default'/>}
]

export default function SideMenu({currentMod, changeModHandler}) {
    const {lang} = useContext(LanguageContext)
    return <Box style={{
        display: 'flex',
        flexFlow: 'column'
    }}>
        {iconButton.map(button => (
            <Tooltip key={button.name} title={INTERFACE_LANGUAGE[button.name][lang]}>
                <IconButton
                    color={currentMod === button.name ? 'primary' : 'default'}
                    aria-label={button.name}
                    onClick={() => changeModHandler(button.name)}>
                    {button.icon}
                </IconButton>
            </Tooltip>))}
    </Box>
}