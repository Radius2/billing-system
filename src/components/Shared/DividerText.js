import {Box, Divider, Typography} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

const useStyle = makeStyles((theme) => ({
    margin: {
        margin: '8px'
    },
    text: {
        fontWeight: 500,
        color: theme.palette.text.primary,
        opacity: 0.7,
    },
}))

export default function DividerText({text}) {
    const classes = useStyle()
    return (
        <Box className={classes.margin}>
            <Divider/>
            <Typography
                className={classes.text}
                variant='overline'
            >
                {text}</Typography>
            <Divider/>
        </Box>
    )
}