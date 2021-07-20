import React, {useState, useRef} from 'react';
import {Switch, Route, Redirect, useLocation} from 'react-router';
import Interface from './components/Interface/Interface';
import Login from './components/Login/Login';
import {deleteToken} from './api/api';
import TEST from './components/TEST';
import {AVAILABLE_LANGUAGE} from './util/language';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme, darkTheme} from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';

export const LanguageContext = React.createContext();
export const ThemeContext = React.createContext();

const navArr = [
    {to: '/handbook', name: 'Все справочники'},
    {to: '/form/contracts', name: 'Договоры'},
    {to: '/form/objects', name: 'Точки учета'},
    {to: '/form/objcontract', name: 'Связка договор/точки учета'},
    {to: '/form/acts', name: 'Акты'},
    {to: '/form/actdetails', name: 'Детали актов'},
];

export default function App() {
    const [lang, setLang] = useState(localStorage.getItem('language') || 'RU');
    const [isDark, setIsDark] = useState(!!localStorage.getItem('isDark') || false);
    const [isAuth, setAuth] = useState(false); // флаг логина
    const [accessForms, setAccessForms] = useState([]); // список достумных форм
    const location = useLocation();
    const from = useRef(location.pathname); // сохранение ссылки для возврата назад при удачном автоматическом логине

    function logout() {
        deleteToken();
        setAuth(false);
    }

    return (
        <ThemeProvider theme={isDark ? darkTheme : theme}>
            <ThemeContext.Provider
                value={{
                    isDark: isDark,
                    themeSwitch: () => {
                        setIsDark(prev => {
                            localStorage.setItem('isDark', !prev ? 'yes' : '')
                            return !prev
                        })
                    },
                }}>
                <LanguageContext.Provider
                    value={{
                        lang,
                        setLang: lang => {
                            if (AVAILABLE_LANGUAGE.includes(lang)) {
                                setLang(lang);
                                localStorage.setItem('language', lang);
                            }
                        },
                    }}>
                    <CssBaseline/>
                    <Switch>
                        <Route path='/test' component={TEST}/>
                        <Route
                            path='/login'
                            render={routeProps => (
                                <Login from={from.current} {...routeProps} isAuth={isAuth} setAuth={e => setAuth(e)}
                                       setAccessForms={e => setAccessForms(e)}/>
                            )}
                            exact
                        />
                        {isAuth ? <Interface logout={logout} accessForms={accessForms} navArr={navArr}/> :
                            <Redirect to='/login'/>}
                    </Switch>
                </LanguageContext.Provider>
            </ThemeContext.Provider>
        </ThemeProvider>
    );
}
