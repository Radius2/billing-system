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
    input: {
        margin: theme.spacing(1),
        display: 'inline-flex',
        width: props => props.width,
        '& .MuiFormLabel-root': {
            color: theme.palette.text.primary,
            fontSize: '1.1rem',
            fontWeight: 500,
        },
        '& .MuiInputBase-input': {
            fontWeight: 400,
        },
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
        flexFlow: 'column'
    },
    actionPanel: {
        display: 'flex',
        justifyContent: 'flex-end',
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}))

export default useStyle;