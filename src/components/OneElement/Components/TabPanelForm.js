import {Box} from '@material-ui/core';
import React from 'react';
import {TabPanel} from '../../Shared/TabPanel';

export default function TabPanelForm({value, index, children}) {
    return <TabPanel value={value} index={index}>
        <Box style={{
            marginLeft: '16px',
            display: 'flex',
            flexFlow: 'column',
            height: '100%'
        }}
        >
            {children}
        </Box>
    </TabPanel>

}