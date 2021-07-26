import React from 'react';
import Handbook from './components/Handbook/Handbook';
import ListForms from './components/ListForms/ListForms';
import ListHandbooks from './components/ListHandbooks/ListHandbooks';
import {structureTable as acts} from './structure/formStructures/actStructure';
import {structureTable as contracts} from './structure/formStructures/contractStructure';
import {structureTable as objects} from './structure/formStructures/objectStructure';
import {structureTable as subjects} from './structure/formStructures/subjectStructure';
import {handbooks} from './structure/handbookStructure/handbook';
import {setLanguages} from './util/language';
import ApartmentIcon from '@material-ui/icons/Apartment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DescriptionIcon from '@material-ui/icons/Description';
import AssessmentIcon from '@material-ui/icons/Assessment';


const HANDBOOKS = {
    title: setLanguages('Справочники', 'Әдебиеттер тізімі', 'Handbooks'),
    path: '/handbook/:name',
    render: props => <Handbook structure={handbooks[props.match.params.name]}/>,

}

const FORM_CONTRACTS = {
    title: setLanguages('Договоры', 'Шарттар', 'Contracts'),
    path: '/form/contracts',
    render: () => <Handbook structure={contracts}/>,
    icon: <FileCopyIcon/>
}

const FORM_OBJECTS = {
    title: setLanguages('Точки учета', 'Бухгалтерлік есеп', 'Objects'),
    path: '/form/objects',
    render: () => <Handbook structure={objects}/>,
    icon: <ApartmentIcon/>
}

const FORM_ACTS = {
    title: setLanguages('Акты', 'Елшілердің істері', 'Acts'),
    path: '/form/acts',
    render: () => <Handbook structure={acts}/>,
    icon: <DescriptionIcon/>
}

const FORM_SUBJECTS = {
    title: setLanguages('Субъекты', 'Тақырыптар', 'Subjects'),
    path: '/form/subjects',
    render: () => <Handbook structure={subjects}/>,
    icon: <SupervisorAccountIcon/>

}


export const FORM_LINKS = [FORM_CONTRACTS, FORM_OBJECTS, FORM_ACTS, FORM_SUBJECTS];
export const REPORT_LINKS = [];

const HANDBOOK = {
    title: setLanguages('Справочники', 'Әдебиеттер тізімі', 'Handbooks'),
    path: '/handbook',
    render: () => <ListHandbooks title={HANDBOOK.title}/>,
    icon: <MenuBookIcon/>
}

const FORM = {
    title: setLanguages('Документы', 'Құжаттар', 'Documents'),
    path: '/form',
    render: () => <ListForms title={FORM.title}/>,
    icon: <FileCopyIcon/>,
    subPath: FORM_LINKS,
}

const REPORT = {
    title: setLanguages('Отчеты', 'Есеп беру', 'Reports'),
    path: '/report',
    render: () => <div/>,
    icon: <AssessmentIcon/>,
    subPath: REPORT_LINKS,
}

export const MENU_LINKS = [FORM, REPORT, HANDBOOK];
export const PRIVATE_ROUTES = [...MENU_LINKS, HANDBOOKS, ...FORM_LINKS, ...REPORT_LINKS];


