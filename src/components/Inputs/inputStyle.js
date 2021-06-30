import {makeStyles} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
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
}))

export default useStyle;