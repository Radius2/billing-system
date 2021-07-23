import React, {useContext, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Link} from 'react-router-dom';
import {LanguageContext} from '../../App';
import {getHandbooks} from '../../structure/handbookStructure/handbook';

const useStyle = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        height: '100%',
        width: '100%',
    },
    linkContainer: {
        display: 'flex',
        flexFlow: 'column',
        flexWrap: 'wrap',
        padding: theme.spacing(2),
        maxHeight: '400px',
    },
    link: {
        marginBottom: theme.spacing(1),
        color: theme.palette.text.primary
    }
}))

export default function ListHandbooks({title}) {
    const [links] = useState(getHandbooks());
    const {lang} = useContext(LanguageContext);
    const classes = useStyle();

    return (
        <Box className={classes.root}>
            <Typography variant='subtitle1'>{title[lang]}</Typography>
            <Divider/>
            <Box className={classes.linkContainer}>
                {links.map((handbook, index) => (
                    <Link
                        key={handbook.path}
                        className={classes.link}
                        to={handbook.path}>
                        <Typography color='textPrimary' variant='body2'>
                            {index + 1}. {handbook.header(lang)}
                        </Typography>
                    </Link>
                ))}
            </Box>
        </Box>
    )
}
