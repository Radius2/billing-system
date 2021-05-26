import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import {NavLink} from 'react-router-dom';

const ListItemNav = props => {
    const {to, name, activeClass} = props
    return (
        <li>
            <ListItem button component={NavLink} to={to} activeClassName={activeClass}>
                <ListItemText  primary={name}/>
            </ListItem>
        </li>
    );
};

export default ListItemNav;
