import {InputBase} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const StyledInput= withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        //backgroundColor: theme.palette.background.paper,
        border: 'none',
        //border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // '&:focus': {
        //     borderRadius: 4,
        //     borderColor: '#80bdff',
        //     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        // },
    },
}))(InputBase);

export default StyledInput