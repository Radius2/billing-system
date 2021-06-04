import {Box, Button, Collapse, TableCell, TableRow} from '@material-ui/core';
import React, {useContext, useEffect} from 'react';
import {LanguageContext} from '../../App';
import {INTERFACE_LANGUAGE} from '../../util/language';
import useStyle from './style';

export default function CollapseRowInterface({open, colSpan, actionHandler, cancelHandler, actionName, onCloseHandler}) {
    const classes = useStyle();
    const {lang} = useContext(LanguageContext);
    useEffect(() => {
        if (!open) {
            onCloseHandler()
        }
    }, [open])

    return (
        <TableRow>
            <TableCell
                className={classes.rowInterface}
                colSpan={colSpan}>
                <Collapse in={open}>
                    <Box className={classes.rowInterface__container}>
                        <Button
                            onClick={actionHandler}>
                            {actionName}
                        </Button>
                        <Button onClick={cancelHandler}>
                            {INTERFACE_LANGUAGE.cancel[lang]}
                        </Button>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>)
}