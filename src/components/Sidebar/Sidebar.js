import React from 'react';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import ListItemNav from './Nav';
import Breadcrumb from '../Header/Breadcrum';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';

const navArr = [
    {to: '/1', name: 'Работа с договорами'},
    {to: '/2', name: 'Обслуживание сетей'},
    {to: '/3', name: 'МЖФ и ОДКУ'},
    {to: '/4', name: 'Балансы электроэнергии'},
    {to: '/5', name: 'Обращение потребителей'},
    {to: '/6', name: 'Акты нарушений'},
    {to: '/7', name: 'Отключения'},
    {to: '/8', name: 'Снятие показаний'},
    {to: '/9', name: 'КПК'},
    {to: '/10', name: 'Оплата'},
    {to: '/11', name: 'Тарифы'},
    {to: '/12', name: 'Справочники системы'},
    {to: '/13', name: 'Все отчеты потребления'},
];

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex'
    },
    title: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navList: {
        height: '100vh',
        flexBasis: drawerWidth
    },
    active: {
        color: theme.palette.primary.main,

    },
    content: {
        flexGrow: 1,
        width: '100%',
        padding: '8px',
    },
    main: {}
}));

function Sidebar(props) {
    const classes = useStyles();

    return (
        <>
            {/*<AppBar position="static">*/}
            {/*    <Toolbar>*/}
            {/*        <Typography variant="h6" className={classes.title}>*/}
            {/*            Биллинговая система*/}
            {/*        </Typography>*/}
            {/*        <Button className={classes.menuButton} color="inherit">Выход</Button>*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}
            <div className={classes.container}>
                <div className={classes.navList}>
                    <List>
                        {navArr.map((nav, index) => (
                            <ListItemNav key={index} {...nav} activeClass={classes.active}/>
                        ))}
                    </List>
                </div>
                <div className={classes.content}>
                    <Breadcrumb location={props.location}/>
                    <main className={classes.main}>
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Sidebar;