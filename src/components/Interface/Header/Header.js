import {MenuItem, Toolbar, Menu} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, {useContext, useState} from 'react';
import {LanguageContext, ThemeContext} from '../../../App';
import {AVAILABLE_LANGUAGE, INTERFACE_LANGUAGE} from '../../../util/language';
import TooltipButton from '../../Shared/TooltipButton';
import StyledInput from '../../StyledComponents/StyledInput';
import Search from './Search';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyle = makeStyles((theme) => ({
    toolbar: {
        paddingLeft: theme.spacing(1),
        '& > *': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        '& :first-child': {
            marginLeft: 0,
            marginRight: 'auto'
        }
    }
}))

export default function Header({logout, children}) {
    const classes = useStyle()
    const {lang, setLang} = useContext(LanguageContext);
    const {isDark, themeSwitch} = useContext(ThemeContext);
    const [openAccountMenu, setOpenAccountMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    function openMenuHandler(e) {
        setOpenAccountMenu(true);
        setAnchorEl(e.currentTarget)
    }

    function closeMenuHandler() {
        setOpenAccountMenu(false)
        setAnchorEl(false)
    }

    return (
        <Toolbar className={classes.toolbar}>
            {children}

            <Search/>

            <FormControl variant='outlined'>
                <Select
                    value={lang}
                    onChange={e => setLang(e.target.value)}
                    label='Language'
                    input={<StyledInput/>}>
                    {AVAILABLE_LANGUAGE.map(lang => (
                        <MenuItem key={lang} value={lang}>
                            {lang}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TooltipButton tooltipTitle='переключить тему' actionHandler={themeSwitch}
                           icon={isDark ? <Brightness5Icon/> : <Brightness4Icon/>}/>

            <TooltipButton tooltipTitle='Настройки' actionHandler={openMenuHandler}
                           icon={<AccountCircleIcon/>}/>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={openAccountMenu}
                onClose={closeMenuHandler}
            >
                <MenuItem onClick={closeMenuHandler}>Настройки</MenuItem>
                <MenuItem onClick={logout}>{INTERFACE_LANGUAGE.exit[lang]}</MenuItem>
            </Menu>
        </Toolbar>
    );
}
