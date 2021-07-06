import {makeStyles} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: theme.spacing(2),
    },
    inputMui: {
        '& .MuiFormLabel-root': {
            color: theme.palette.text.primary,
            fontSize: '1.1rem',
            fontWeight: 500,
        },
        '& .MuiInputBase-input': {
            fontWeight: 400,
        },
        margin: theme.spacing(1) + 'px !important',
        display: 'inline-flex',
        width: props => props.width,
    },
    inputChanged: {
        '& .MuiInput-underline:before, .MuiInput-underline:after': {
            borderBottom: '2px solid ' + theme.palette.success.main,
        }
    },
    inputDisabled: {
        '& .MuiInput-underline:after, .MuiInput-underline:before, .Mui-disabled': {
            color: theme.palette.text.primary,
        },
    },
    namePanel: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        '& > :first-child': {
            marginRight: 'auto'
        }
    },
    actionPanel: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: 'flex',
        justifyContent: 'flex-end',
    }
}))

export default useStyle;