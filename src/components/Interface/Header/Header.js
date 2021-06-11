import {Box, InputBase, TextField, MenuList, MenuItem, Paper, Toolbar, Typography, makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {LanguageContext} from '../../../App';
import {useInput} from '../../../hooks/useInput';
import {getHandbooks} from '../../../util/handbook';
import {AVAILABLE_LANGUAGE, INTERFACE_LANGUAGE} from '../../../util/language';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyle = makeStyles(theme => ({
    search: {
        position: 'relative',
        width: '200px',
        height: '100%',
        display: 'flex',
        flexFlow: 'column'
    },
    menu: {
        position: 'absolute',
        top: '40px',
        right: '0',
        width: '400px',
        zIndex: 10000,
    }
}))
export default function Header({logout, children}) {
    const {lang, setLang} = useContext(LanguageContext);
    const classes = useStyle()

    const history = useHistory()
    const [options] = useState(getHandbooks())
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([])

    function searchFunction(value) {
        const filtredOptions = options.filter(option => option.name.toLowerCase().includes(searchInput.toLowerCase()))
        setSearchResult(filtredOptions)
    }

    useEffect(() => {
            if (searchInput.length > 0) searchFunction(searchInput)
        }, [searchInput]
    )

    return (<Toolbar>
        {children}
        <Box className={classes.search}>
            <TextField value={searchInput} onChange={e => setSearchInput(e.target.value)} fullWidth/>
            {searchInput.length > 0 ?
                <Paper className={classes.menu} elevation={10}>
                    <MenuList>
                        {(searchResult.length > 0) ?
                            searchResult.map((result, index) => {
                                const startIndex = result.name.toLowerCase().search(searchInput.toLowerCase());
                                const textStart = result.name.slice(0, startIndex);
                                const textBold = result.name.slice(startIndex, startIndex + searchInput.length);
                                const textEnd = result.name.slice(startIndex + searchInput.length);
                                return (
                                    <MenuItem
                                        key={result.name + index}
                                        onClick={() => {
                                            setSearchInput('');
                                            setSearchResult([]);
                                            history.push(result.path)
                                        }}>
                                        {/*<Typography variant='h5'>*/}
                                        {/*    {result.header(lang)}*/}
                                        {/*</Typography>*/}
                                        <Typography
                                            variant='subtitle1'>
                                            {textStart}
                                            <Typography
                                                component='span'
                                                variant='h6'>
                                                {textBold}
                                            </Typography>
                                            {textEnd}
                                        </Typography>
                                    </MenuItem>)
                            })
                            : <MenuItem>
                                <Typography
                                    variant='subtitle1'>
                                    результатов нет
                                </Typography>
                            </MenuItem>}
                    </MenuList>
                </Paper>
                : null}
        </Box>
        <Button onClick={logout}>{INTERFACE_LANGUAGE.exit[lang]}</Button>
        <FormControl variant="outlined">
            <Select
                value={lang}
                onChange={e => setLang(e.target.value)}
                label="Language"
                input={<BootstrapInput/>}
            >
                {AVAILABLE_LANGUAGE.map((lang) => <MenuItem key={lang} value={lang}>{lang}</MenuItem>)}
            </Select>
        </FormControl>
    </Toolbar>)
}