import {IconButton, Tooltip} from '@material-ui/core';
import React from 'react';

export default function TooltipButton({active, actionHandler, icon, tooltipTitle}) {
    return (
        <Tooltip title={tooltipTitle}>
            <IconButton
                size={'small'}
                color={active ? 'primary' : 'default'}
                aria-label={tooltipTitle}
                onClick={actionHandler}>
                {icon}
            </IconButton>
        </Tooltip>)
}
