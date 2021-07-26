import {Box, Button} from '@material-ui/core';
import React, {useContext} from 'react';
import {LanguageContext} from '../../../App';
import {INTERFACE_LANGUAGE} from '../../../util/language';
import useStyle from '../oneElementStyle';

export default function ButtonPanel({disableActionButton, actionButtonHandler, closeButtonHandler}) {
    const {lang} = useContext(LanguageContext)
    const classes = useStyle();
    return <Box className={classes.actionPanel}>
        <Button disabled={disableActionButton} size='large' color='primary'
                onClick={actionButtonHandler}>
            {INTERFACE_LANGUAGE.save[lang]}
        </Button>
        <Button size='large' onClick={closeButtonHandler}>
            {INTERFACE_LANGUAGE.exit[lang]}
        </Button>
    </Box>
}