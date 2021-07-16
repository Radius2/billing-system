import React from 'react';
import {Box} from '@material-ui/core';

export function TabPanel({children, value, index, style={}}) {
    return (
        <Box style={{display: value === index ? 'block' : 'none', height: '100%', width: '100%', ...style}}>
            {children}
        </Box>)

}