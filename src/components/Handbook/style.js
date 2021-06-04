import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
    input: {
        fontSize: 14
    },
    row: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    rowChanged: {
        //backgroundColor: theme.palette.info.light
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