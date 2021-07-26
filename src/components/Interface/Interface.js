import React, {useState, useMemo} from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Box, Drawer, IconButton, Divider, Grid} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {MENU_LINKS} from '../../routes';
import Content from '../Content/Content';
import Header from './Header/Header';
import Sidemenu from './Sidemenu/Sidemenu';

const WIDE_SIDEMENU = 270;
const CLOSED_SIDEMENU = 72;

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
        backgroundColor: theme.palette.sideMenu,
        color: theme.palette.getContrastText(theme.palette.sideMenu),
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
    drawerOpen: {
        width: WIDE_SIDEMENU + 'px',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        width: CLOSED_SIDEMENU + 'px',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
    },
    workSpace: {
        paddingBottom: '8px',
        flexGrow: 1,
        height: '100vh',
        overflow: 'hidden',
    },
    transition: {
        '& *': {
            transition: theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
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
    rounded: {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    headerToolbar: {
        minHeight: '56px',
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(2) + 'px ' + theme.spacing(1) + 'px'
        }
    }
}))


export default function Interface({logout}) {
    const [showSidemenu, setShowSidemenu] = useState(true)
    const classes = useStyles();
    const content = useMemo(() => <Content/>
        , [])
    return (
        <Box className={classes.gridContainer}>
            <Drawer open={showSidemenu}
                    variant="permanent"
                    className={clsx({
                        [classes.drawerOpen]: showSidemenu,
                        [classes.drawerClose]: !showSidemenu,
                    })}
                    classes={{
                        paper: clsx(classes.drawer, {
                            [classes.drawerOpen]: showSidemenu,
                            [classes.drawerClose]: !showSidemenu,
                        })
                    }}>
                <Box className={classes.headerToolbar}>
                    <Avatar variant="rounded" className={classes.rounded}>
                        <AssignmentIcon/>
                    </Avatar>
                    {showSidemenu &&
                    <Typography
                        noWrap
                        variant='h6'
                        align='center'>
                        Billing-A-REK
                    </Typography>}
                </Box>
                <Divider/>
                <Sidemenu openVariant={showSidemenu} navArr={MENU_LINKS}/>
            </Drawer>
            <Box className={clsx(classes.workSpace)}>
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