import React from 'react';
import {Box} from '@material-ui/core';

export function TabPanel({children, value, index}) {
    return (
        <Box style={{marginTop: '8px', display: value === index ? 'block' : 'none'}}>
            {children}
        </Box>)

}