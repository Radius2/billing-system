import {Box, Button, Collapse, TableCell, TableRow, Typography} from '@material-ui/core';
import React, {useContext} from 'react';
import {LanguageContext} from '../../App';
import {INTERFACE_DIALOG, INTERFACE_LANGUAGE} from '../../util/language';
import useStyle from './style';

export default function CollapseRowInterface({open, colSpan, actionHandler, cancelHandler, valid, className}) {
    const classes = useStyle();
    const {lang} = useContext(LanguageContext);
    return (
        <TableRow className={className}>
            <TableCell
                className={classes.rowInterface}
                colSpan={colSpan}>
                <Collapse in={open} mountOnEnter={true} unmountOnExit={true}>
                    <Box className={classes.rowInterface__container}>
                        {valid ? <Box/>
                            : <Typography variant='body2'>
                                {INTERFACE_DIALOG.invalidRequiredField[lang]}
                            </Typography>}
                        <Button
                            disabled={!valid}
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