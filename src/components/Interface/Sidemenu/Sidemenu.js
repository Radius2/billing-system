import React from 'react';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import ListItemNav from './Nav';

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
    item:{
        borderRadius: theme.shape.borderRadius+'px',
        margin: theme.spacing(1)+'px 0',
    },
    active: {
        '&, &:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        }
    },
}));

export default function Sidemenu(props) {
    const classes = useStyles();

    return (
                    <List>
                        {props.navArr.map((nav, index) => (
                            <ListItemNav key={index} {...nav} itemClass={classes.item} activeClass={classes.active}/>
                        ))}
                    </List>
    )
}
