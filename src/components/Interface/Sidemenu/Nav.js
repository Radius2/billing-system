import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {LanguageContext} from '../../../App';

const useStyles = makeStyles((theme) => ({
    item: {
        minHeight: '48px',
        borderRadius: theme.shape.borderRadius + 'px',
        margin: theme.spacing(1) + 'px 0',
        // '& + div': {
        //     display: 'none'
        // },
        '& svg': {
            color: theme.palette.primary.contrastText,
        }
    },
    itemNested: {
        paddingLeft: theme.spacing(3),
        '& svg': {
            color: theme.palette.primary.contrastText,
        },
        transition: '0.6s'
    },
    active: {
        '&, &:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
        // '& + div': {
        //     display: 'block'
        // },
    },
    activeNested: {
        '&, &:hover': {
            color: theme.palette.primary.main,
        }
    },
}));

const ListItemNav = ({to, name, icon, active, openVariant, subPath}) => {
    const classes = useStyles();
    const {lang} = useContext(LanguageContext)

    return (
        <li>
            <ListItem button component={NavLink} to={to} className={classes.item} activeClassName={classes.active}>
                {openVariant ?
                    <>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={name}/>

                    </> :
                    <Tooltip title={name}>
                        <ListItemIcon>{icon}</ListItemIcon>
                    </Tooltip>
                }
            </ListItem>
            {subPath && openVariant && (
                <Collapse in={active} timeout="auto">
                    <List component="div" disablePadding>
                        {subPath.map(link => (
                            <ListItem
                                key={link.path}
                                button
                                component={NavLink}
                                to={link.path}
                                className={classes.itemNested}
                                activeClassName={classes.activeNested}
                            >
                                {/*<ListItemIcon>*/}
                                {/*    {link.icon}*/}
                                {/*</ListItemIcon>*/}
                                <ListItemText primary={link.title[lang]}/>
                            </ListItem>))}

                    </List>
                </Collapse>)}
        </li>
    );
};

export default ListItemNav;
