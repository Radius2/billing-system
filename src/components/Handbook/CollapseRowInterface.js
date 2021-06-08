import {Box, Button, Collapse, TableCell, TableRow} from '@material-ui/core';
import React, {useContext, useEffect} from 'react';
import {LanguageContext} from '../../App';
import {INTERFACE_LANGUAGE} from '../../util/language';
import useStyle from './style';

export default function CollapseRowInterface({open, colSpan, actionHandler, cancelHandler, actionName, className}) {
    const classes = useStyle();
    const {lang} = useContext(LanguageContext);
    return (
        <TableRow className={className}>
            <TableCell
                className={classes.rowInterface}
                colSpan={colSpan}>
                <Collapse in={open} mountOnEnter={true} unmountOnExit={true}>
                    <Box className={classes.rowInterface__container}>
                        <Button
                            onClick={actionHandler}>
                            {INTERFACE_LANGUAGE.save[lang]}
                        </Button>
                        <Button onClick={cancelHandler}>
                            {INTERFACE_LANGUAGE.cancel[lang]}
                        </Button>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>)
}