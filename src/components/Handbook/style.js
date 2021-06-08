import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        height: '50px'
    },
    input: {
        fontSize: 14
    },
    row: {
        overflowWrap: 'break-word',
        '& > *': {
            borderBottom: 'unset',
        },
    },
    rowHeader:{
        '& > *': {
            padding: '8px 16px',
        }
    },
    rowChanged: {
        backgroundColor: theme.palette.action.selected
    },
    rowDelete: {
        backgroundColor: 'rgba(255,0,0,0.15)',
    },
    rowButton: {
        cursor: 'pointer'
    },
    rowInterface: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    rowInterface__container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))

export default useStyle