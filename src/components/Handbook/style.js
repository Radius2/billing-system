import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    toolbar: {
        alignItems: 'center',
        padding: '0 24px',
        height: '50px',
        '& :first-child': {
            marginRight: 'auto'
        }
    },
    input: {
        fontSize: 14
    },
    row: {
        overflowWrap: 'break-word',
        '& > *': {
            borderBottom: 'unset',
            padding: '12px 12px',
            verticalAlign: 'bottom',
        },
    },
    rowHeader: {
        '& > *': {
            padding: '8px 12px',
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
        paddingLeft: 46 + 70 + 'px',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& > :first-child': {
            color: theme.palette.error.main,
            marginRight: 'auto'
        }
    },
    sortButton__arrow: {
        opacity: 0,
        marginLeft: '4px',
        fontSize: '1rem',
        transition: '0.3s'
    },
    sortButton__arrow_active: {
        opacity: 1
    },
    sortButton__arrow_turn: {
        transform: 'rotate(180deg)'
    },
    sortButton: {
        '&:hover': {
            '& > *': {
                opacity: 0.5
            }
        }
    }
}))

export default useStyle