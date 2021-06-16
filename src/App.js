import React, {useState, useRef} from 'react';
import {Switch, Route, Redirect, useLocation} from 'react-router';
import Interface from './components/Interface/Interface';
import Login from './components/Login/Login';
import {deleteToken} from './api/api';
import {AVAILABLE_LANGUAGE} from './util/language';

export const LanguageContext = React.createContext();

const navArr = [
    {to: '/handbook/form_types', name: 'Справочник типы форм'},
    {to: '/handbook/sub_types', name: 'Справочник подтипы'},
    {to: '/handbook/banks', name: 'Справочник банки'},
    {to: '/handbook/positions', name: 'Справочник позиции'},
    {to: '/handbook/org_info', name: 'Справочник организации'},
];

export default function App() {

    const [lang, setLang] = useState(localStorage.getItem('language') || 'RU')
    const [isAuth, setAuth] = useState(false); // флаг логина
    const [accessForms, setAccessForms] = useState([]); // список достумных форм
    const location = useLocation();
    const from = useRef(location.pathname); // сохранение ссылки для возврата назад при удачном автоматическом логине

    function logout() {
        deleteToken()
        setAuth(false)
    }

    return (
        <LanguageContext.Provider value={
            {
                lang,
                setLang: (lang) => {
                    if (AVAILABLE_LANGUAGE.includes(lang)) {
                        setLang(lang);
                        localStorage.setItem('language', lang)
                    }
                }
            }}>
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
                {isAuth ? <Interface logout={logout} accessForms={accessForms} navArr={navArr}/> :
                    <Redirect to='/login'/>}
            </Switch>
        </LanguageContext.Provider>
    );
}
