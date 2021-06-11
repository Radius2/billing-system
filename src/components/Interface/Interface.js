import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, {useState, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Drawer, IconButton, Divider} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Content from '../Content/Content';
import Header from './Header/Header';
import Sidemenu from './Sidemenu/Sidemenu';

const WIDE_SIDEMENU = 270;

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        position: 'relative',
    },
    drawer: {
        width: WIDE_SIDEMENU + 'px',
        flexShrink: 0,
        backgroundColor: theme.palette.grey[400],
        color: theme.palette.getContrastText(theme.palette.grey[400]),
        paddingLeft: '8px',
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
    drawerPaper: {
        width: WIDE_SIDEMENU + 'px',
    },
    workSpace: {
        paddingBottom: '8px',
        flexGrow: 1,
        height: '100vh',
        overflow: 'hidden',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -WIDE_SIDEMENU + 'px',
    },
    workSpaceShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    transition: {
        marginRight: 'auto',
        '& *': {
            transition: '0.5s',
        }
    },
    rotate180: {
        transform: 'rotate(-180deg)',
    },
    content: {
        display: 'flex',
        height: 'calc(100vh - 64px)',
        paddingBottom: '8px',
        justifyContent: 'center',
    },
}))


export default function Interface({navArr, logout}) {
    const [showSidemenu, setShowSidemenu] = useState(true)
    const classes = useStyles();
    const content = useMemo(() => <Content/>
        , [])
    return (
        <Box className={classes.gridContainer}>
            <Drawer open={showSidemenu}
                    variant="persistent"
                    anchor="left"
                    className={classes.drawerPaper}
                    classes={{paper: classes.drawer}}>
                <Typography variant='h6' align='center'>Billing</Typography>
                <Divider/>
                <Sidemenu navArr={navArr}/>
            </Drawer>
            <Box className={clsx(classes.workSpace, showSidemenu && classes.workSpaceShift)}>
                <Header logout={logout}>
                    <IconButton className={classes.transition} onClick={() => setShowSidemenu(!showSidemenu)}>
                        <ArrowForwardIosIcon className={clsx(showSidemenu && classes.rotate180)}/>
                    </IconButton>
                </Header>
                <Box className={classes.content}>
                    {content}
                </Box>
            </Box>
        </Box>
    )
}