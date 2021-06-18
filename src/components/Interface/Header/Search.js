import {
    InputAdornment,
    Box,
    ClickAwayListener,
    Divider,
    makeStyles,
    MenuItem,
    MenuList,
    Paper,
    TextField,
    Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router';
import {LanguageContext} from '../../../App';
import {getHandbooks} from '../../../util/handbook';
import {INTERFACE_DIALOG, INTERFACE_LANGUAGE} from '../../../util/language';

const useStyle = makeStyles(theme => ({
    search: {
        position: 'relative',
        width: '150px',
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        transition: '0.5s'
    },
    search_active: {
        width: '250px'
    },
    directory: {
        padding: '0 ' + theme.spacing(2) + 'px',
    },
    menu: {
        position: 'absolute',
        top: '40px',
        right: '0',
        width: '400px',
        zIndex: 10000,
    }
}))

function TextDecorator({value, decorate}) {
    const startIndex = value.toLowerCase().search(decorate.toLowerCase());
    const textStart = value.slice(0, startIndex);
    const textBold = value.slice(startIndex, startIndex + decorate.length);
    const textEnd = value.slice(startIndex + decorate.length);
    return <Typography
        variant='body2'>
        {textStart}
        <Typography
            component='span'
            variant='subtitle2'>
            {textBold}
        </Typography>
        {textEnd}
    </Typography>
}

function DirectoryResult({lang, haveResult, searchResult, selectHandler, searchInput}) {
    const classes = useStyle()
    return (haveResult) ?
        <>
            <Box className={classes.directory}>
                <Typography variant='overline'>
                    {INTERFACE_LANGUAGE.handbook[lang]}
                </Typography>
                <Divider/>
            </Box>
            {
                searchResult.map((result, index) => {
                    return (
                        <MenuItem
                            key={result.name + index}
                            onClick={() => selectHandler(result.path)}>
                            <Box>
                                <Typography variant='h6'>
                                    {result.header(lang)}
                                </Typography>
                                <TextDecorator value={result.name} decorate={searchInput}/>
                            </Box>
                        </MenuItem>)
                })
            }</>
        :
        <MenuItem>
            <Typography
                variant='subtitle1'>
                {INTERFACE_DIALOG.noResultsFound[lang]}
            </Typography>
        </MenuItem>
}

export default function Search() {
    const {lang} = useContext(LanguageContext);
    const inputRef = useRef();
    const menuRef = useRef();
    const classes = useStyle();
    const history = useHistory();
    const [options] = useState(getHandbooks());
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([])
    const [fullWidth, setFullWidth] = useState(false)

    function handleListKeyDown(e) {
        if (e.key === 'ArrowDown' && searchResult.length > 0) menuRef.current.focus()
    }

    function searchFunction() {
        const filteredOptions = options.filter(option => option.name.toLowerCase().includes(searchInput.toLowerCase()))
        setSearchResult(filteredOptions)
    }

    useEffect(() => {
            if (searchInput.length > 0) searchFunction(searchInput)
        }, [searchInput]
    )

    return <Box className={clsx(classes.search, (fullWidth || searchInput.length > 0) && classes.search_active)}>
        <TextField
            inputRef={inputRef}
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={handleListKeyDown}
            size='small'
            onFocus={() => setFullWidth(true)}
            onBlur={() => setFullWidth(false)}
            variant='outlined'
            InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
            }}/>
        {searchInput.length > 0 ?
            <ClickAwayListener onClickAway={(e) => {
                if (e.target !== inputRef.current) setSearchInput('')

            }}>
                <Paper className={classes.menu} elevation={10}>
                    <MenuList ref={menuRef}>
                        <DirectoryResult
                            lang={lang}
                            haveResult={searchResult.length > 0}
                            searchResult={searchResult}
                            searchInput={searchInput}
                            selectHandler={(path) => {
                                setSearchInput('');
                                setSearchResult([]);
                                history.push(path)
                            }}/>
                    </MenuList>
                </Paper>
            </ClickAwayListener>
            : null}
    </Box>
}