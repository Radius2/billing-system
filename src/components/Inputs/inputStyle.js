import {makeStyles} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    inputMui: {
        '& .MuiFormLabel-root': {
            color: theme.palette.text.primary,
            fontSize: '1.05rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
        },
        '& .MuiInputBase-input': {
            fontWeight: 400,
        },
        '& ::-webkit-calendar-picker-indicator': {
            filter: props => 'invert(' + Number(props.isDark) + ')'
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