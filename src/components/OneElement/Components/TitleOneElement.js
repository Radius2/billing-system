import {Box, Divider, Tooltip, Typography} from '@material-ui/core';
import React from 'react';
import useStyle from '../oneElementStyle';
import TooltipButton from '../../Shared/TooltipButton';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default function TitleOneElement({id, addMode, disableDelete, closeHandler, title, addTitle, nameElement, deleteElementHandler}) {
    const classes = useStyle();
    return <>
        <Box className={classes.namePanelForm}>
        <TooltipButton
            actionHandler={closeHandler}
            icon={<ArrowBackIcon />}
            tooltipTitle={'Закрыть'} />
            <Box style={{ marginRight:'auto', marginLeft:'16px'}}>
                <Tooltip title={'ID:' + id}>
                    <Typography variant={'h6'}>
                        {(addMode ? addTitle : title)}
                        <Typography component='span' variant='subtitle1'>
                            {nameElement}
                        </Typography>
                    </Typography>
                </Tooltip>
            </Box>
            {addMode||disableDelete||<TooltipButton actionHandler={deleteElementHandler} icon={<DeleteIcon/>} tooltipTitle={'Удалить'}/>}
        </Box>
        <Divider/>
    </>
}