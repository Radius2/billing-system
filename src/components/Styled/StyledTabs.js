import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const StyledTabs = withStyles(theme => ({
    root: {
        borderRight: '1px solid ' + theme.palette.divider
    },
    indicator: {
        backgroundColor: theme.palette.text.primary,
    },
}))(Tabs);

export const StyledTab = withStyles((theme) => ({
    root: {
        height: '100%',
        alignSelf:'stretch',
        textTransform: 'none',
        '& > span': {
            alignItems: 'flex-end'
        },
        // '&:hover': {
        //     color: '#40a9ff',
        //     opacity: 1,
        // },
        // '&$selected': {
        //     color: '#1890ff',
        //     fontWeight: theme.typography.fontWeightMedium,
        // },
        // '&:focus': {
        //     color: '#40a9ff',
        // },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);