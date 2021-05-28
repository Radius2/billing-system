import Button from '@material-ui/core/Button';
import React from 'react'
import Content from './components/Content/Content';
import Interface from './components/Interface/Interface';
import Sidemenu from './components/Interface/Sidemenu/Sidemenu';


const navArr = [
    {to: '/handbook/form_types', name: 'Тестовый справочник'},
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
    return (
        <Interface>
            <Sidemenu navArr={navArr}/>
            <div style={{backgroundColor: 'blue', height: '100%'}}>
                <Button onClick={props.logout}>Выход</Button>
                <br/>
                Это будет шапка
            </div>
            <Content/>
        </Interface>
    )
}