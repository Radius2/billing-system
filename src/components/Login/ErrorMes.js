import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles(theme => ({
    errMes: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius + 'px',
        boxShadow: theme.shadows[1],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ErrorMes({code, message}) {
    const classes = useStyles();
    return (
        <div className={classes.errMes}><Typography component='body2'>{message}</Typography>
        </div>
    )
}