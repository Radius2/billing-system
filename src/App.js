import React, {useState, useEffect, useRef} from 'react';
import {Switch, Route, Redirect, useHistory, useLocation} from 'react-router';
import Login from './components/Login/Login';
import User from './User';
import {deleteToken} from './api/api';

export default function App() {
    const [isAuth, setAuth] = useState(false); // флаг логина
    const [accessForms, setAccessForms] = useState([]); // список достумных форм
    const location = useLocation();
    const from = useRef(location.pathname); // сохранение ссылки для возврата назад при удачном автоматическом логине

    function logout() {
        deleteToken()
        setAuth(false)
    }

    return (
        <Switch>
            <Route
                path='/login'
                render={routeProps => <Login from={from.current}
                                             {...routeProps}
                                             isAuth={isAuth}
                                             setAuth={e => setAuth(e)}
                                             setAccessForms={e => setAccessForms(e)}/>
                }
                exact
            />
            {isAuth ? <User logout={logout} accessForms={accessForms}/> : <Redirect to='/login'/>}
        </Switch>
    );
}
