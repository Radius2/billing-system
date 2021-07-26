import React, {useContext, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DescriptionIcon from '@material-ui/icons/Description';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Link} from 'react-router-dom';
import {LanguageContext} from '../../App';
import {FORM_LINKS} from '../../routes';

const useStyle = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        height: '100%',
        width: '100%',
    },
    linkContainer: {
        marginTop: theme.spacing(1),
    },
    link: {
        marginBottom: theme.spacing(1),
        color: theme.palette.text.primary,
        textDecoration: 'none',
    },
    linkButton: {
        backgroundColor: theme.palette.background.paper,
        justifyContent: 'flex-start',
        color: theme.palette.text.primary,
        minHeight: '100px',
        minWidth: '270px',
        textDecoration: 'none',
        '& svg' : {
            fontSize: theme.spacing(7) + 'px !important'
        }
    }
}))

export default function ListForms({title}) {
    const [links] = useState(FORM_LINKS);
    const {lang} = useContext(LanguageContext);
    const classes = useStyle();

    return (
        <Box className={classes.root}>
            <Typography variant='h5'>{title[lang]}</Typography>
            <Divider/>
            <Grid
                className={classes.linkContainer}
                container
                spacing={3}
                justify='center'>
                {links.map((link, index) => (
                    <Grid
                        key={link.path}
                        xs={6}
                        item
                        container
                        justify={index % 2 ? 'flex-start' : 'flex-end'}>
                        <Link
                            className={classes.link}
                            to={link.path}>
                            <Button
                                className={classes.linkButton}
                                variant='contained'
                                startIcon={link.icon || <DescriptionIcon />}>
                                {link.title[lang]}
                            </Button>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
