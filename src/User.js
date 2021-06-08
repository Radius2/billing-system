import Button from '@material-ui/core/Button';
import React, {useContext} from 'react'
import {LanguageContext} from './App';
import Content from './components/Content/Content';
import Interface from './components/Interface/Interface';
import Sidemenu from './components/Interface/Sidemenu/Sidemenu';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {AVAILABLE_LANGUAGE, INTERFACE_LANGUAGE} from './util/language';


const navArr = [
    {to: '/handbook/form_types', name: 'Справочник типы форм'},
    {to: '/1', name: 'Работа с договорами'},
    {to: '/2', name: 'Обслуживание сетей'},
    {to: '/3', name: 'МЖФ и ОДКУ'},
    {to: '/4', name: 'Балансы электроэнергии'},
    {to: '/5', name: 'Обращение потребителей'},
    {to: '/6', name: 'Акты нарушений'},
    {to: '/7', name: 'Отключения'},
    {to: '/8', name: 'Снятие показаний'},
    {to: '/9', name: 'КПК'},
    {to: '/10', name: 'Оплата'},
    {to: '/11', name: 'Тарифы'},
    {to: '/12', name: 'Справочники системы'},
    {to: '/13', name: 'Все отчеты потребления'},
    {to: '/13', name: 'Все отчеты потребления'},
    {to: '/13', name: 'Все отчеты потребления'},
    {to: '/13', name: 'Все отчеты потребления'},
    {to: '/13', name: 'Все отчеты потребления'},
    {to: '/13', name: 'Все отчеты потребления'},
    {to: '/13', name: 'Все отчеты потребления'},
    {to: '/13', name: 'Все отчеты потребления'},
    {to: '/13', name: 'Все отчеты потребления'},
    {to: '/13', name: 'Все отчеты потребления'},
];


export default function User(props) {
    const {lang, setLang} = useContext(LanguageContext)
    return (
        <Interface>
            <Sidemenu navArr={navArr}/>
            <div style={{display: 'flex',justifyContent: 'flex-end', alignItems: 'center', height: '100%'}}>
                <Button onClick={props.logout}>{INTERFACE_LANGUAGE.exit[lang]}</Button>
                <FormControl variant="outlined">
                    <Select
                        native
                        value={lang}
                        onChange={e => setLang(e.target.value)}
                        label="Language"
                    >
                        {AVAILABLE_LANGUAGE.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                    </Select>
                </FormControl>
            </div>
            <Content/>
        </Interface>
    )
}