import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useInput} from '../../hooks/useInput';
import {getToken, login} from '../../api/api';
import ErrorMes from './ErrorMes';
import ModalMessage from './Modal';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

export default function Login(props) {
    const {setAccessForms, isAuth, setAuth, from, history} = props;
    const classes = useStyles();
    const passwordInput = useInput();
    const loginInput = useInput();
    const [openModal, setOpenModal] = useState(false);
    const [errorMes, setErrMes] = useState('');
    const [errorCode, setErrorCode] = useState(0);

    useEffect(() => {
        setErrMes('')
    }, [loginInput.value, passwordInput.value])

    useEffect(() => {
        if (isAuth) {
            const redirectTo = from !== '/login' ? from : '/';
            history.push(redirectTo)
        }
    }, [isAuth])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !isAuth) {
            authorization(token);
        }
    }, []);

    function authorization(token) {
        setOpenModal(true);
        login(token)
            .then(resp => {
                setAuth(true);
                setAccessForms(resp.data);
            })
            .catch(err => {
                setErrMes(err.message)
            })
            .finally(() => setOpenModal(false));
    }

    function buttonHandler() {
        authorization(getToken(loginInput.value, passwordInput.value));
    }

    return (
        <>
            <ModalMessage open={openModal}/>
            <Container component='main' maxWidth='xs'>
                <div className={classes.paper}>
                    <Typography component='h1' variant='h5'>
                        Вход
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            {...loginInput}
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Логин'
                            name='email'
                            autoComplete='email'
                            autoFocus
                        />
                        <TextField
                            {...passwordInput}
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Пароль'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />
                        <Button onClick={buttonHandler} fullWidth variant='contained' color='primary'
                                className={classes.submit}>
                            Вход
                        </Button>
                        {
                            errorMes
                                ? <ErrorMes message={errorMes} code={errorCode}/>
                                : null
                        }

                    </form>
                </div>
            </Container>
        </>
    );
}
