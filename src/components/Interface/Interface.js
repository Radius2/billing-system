import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        width: '100vw',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '270px 1fr',
        gridTemplateRows: '70px 1fr',
        gap: '0% 0%',
        gridTemplateAreas:
            `"Sidemenu Header"
            "Sidemenu Content"`
    },
    sidemenu: {
        backgroundColor: theme.palette.secondary.main,
        padding: '0 8px',
        gridArea: 'Sidemenu',
        overflowY: 'scroll',
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(18, 42, 50, 0.0)',
        },
        '&:hover': {
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(18, 42, 50, 0.5)'
            }
        }
    },
    header: {gridArea: 'Header'},
    content: {
        gridArea: 'Content',
        padding: '8px'
    }
}))


export default function Interface(props) {
    const classes = useStyles();
    return (
        <Box className={classes.gridContainer}>
            <Box className={classes.sidemenu}>{props.children[0]}</Box>
            <Box className={classes.header}>{props.children[1]}</Box>
            <Box className={classes.content}>{props.children[2]}</Box>
        </Box>)
}