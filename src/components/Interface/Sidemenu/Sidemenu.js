import React, {useContext} from 'react';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import {LanguageContext} from '../../../App';
import ListItemNav from './Nav';

const useStyles = makeStyles((theme) => ({
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

export default function Sidemenu({navArr}) {
    const classes = useStyles();
    const {lang} = useContext(LanguageContext)

    return (
                    <List>
                        {navArr.map((nav, index) => (
                            <ListItemNav
                                key={index}
                                to={nav.path}
                                name={nav.title[lang]}
                                itemClass={classes.item}
                                activeClass={classes.active}/>
                        ))}
                    </List>
    )
}
