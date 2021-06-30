import {IconButton, Tooltip} from '@material-ui/core';
import React from 'react';

export default function TooltipButton({active,size='small', actionHandler, icon, tooltipTitle}) {
    return (
        <Tooltip title={tooltipTitle}>
            <IconButton
                size={size}
                color={active ? 'primary' : 'default'}
                aria-label={tooltipTitle}
                onClick={actionHandler}>
                {icon}
            </IconButton>
        </Tooltip>)
}
