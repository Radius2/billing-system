import {Box, Divider, Typography} from '@material-ui/core';
import React from 'react';

export default function DividerText ({text}){
    return (
        <Box style={{margin: '8px 8px'}}>
            <Divider/>
            <Typography variant='overline' color={'textSecondary'}>{text}</Typography>
            <Divider/>
        </Box>
    )
}