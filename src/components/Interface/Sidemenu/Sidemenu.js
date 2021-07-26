import React, {useContext} from 'react';
import List from '@material-ui/core/List';
import {useLocation} from 'react-router';
import {LanguageContext} from '../../../App';
import ListItemNav from './Nav';


export default function Sidemenu({navArr, openVariant}) {
    const {lang} = useContext(LanguageContext)
    const location = useLocation()

    return (
        <List>
            {navArr.map((nav, index) => (
                <ListItemNav
                    key={index}
                    active={location.pathname.includes(nav.path)}
                    openVariant={openVariant}
                    to={nav.path}
                    name={nav.title[lang]}
                    icon={nav.icon}
                    subPath={nav.subPath}
                />
            ))}
        </List>
    )
}
