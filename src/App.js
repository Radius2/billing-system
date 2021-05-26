import React, {useState, useEffect, useRef} from 'react';
import {Switch, Route, Redirect, useHistory, useLocation} from 'react-router';
import Login from './components/Login/Login';
import User from './User';


export default function App() {
    const [isAuth, setAuth] = useState(false); // флаг логина
    const [accessForms, setAccessForms] = useState([]) // список достумных форм
    const location = useLocation();
    const from = useRef(location.pathname); // сохранение ссылки для возврата назад при удачном автоматическом логине

    return (
        <Switch>
            <Route path='/login' render={routeProps => (
                <Login
                    from={from.current}
                    {...routeProps}
                    setAuth={(e) => setAuth(e)}
                    setAccessForms={(e) => setAccessForms(e)}/>)}
                   exact/>
            {isAuth ? <User/> : <Redirect to='/login'/>}
        </Switch>
    );
}
