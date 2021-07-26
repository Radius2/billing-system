import {createMuiTheme} from '@material-ui/core/styles';

const shared = {
    sideMenu: 'rgba(0,0,0,0.7)',
    primary: {
        main: '#5893df',
    },
    secondary: {
        main: 'rgba(211,46,112,0.86)',
    },
}

export const theme = createMuiTheme({
    palette: {
        type: 'light',
        ...shared,
        //sideMenu:'#abcddf',
        background: {
            // default: '#eeeeee',
            default: '#87CEEB',
            // default: '#d0e3ed',
            // paper: '#ffffff',
            paper: '#e0eff0',
        },
    },
});

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        ...shared,
        //sideMenu:'#101620',
        background: {
            default: '#192231',
            paper: '#24344d',
        },
    },
});
