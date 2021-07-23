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


const HANDBOOK = {
    title: setLanguages('Справочники', 'Әдебиеттер тізімі', 'Handbooks'),
    path: '/handbook',
    render: () => <ListHandbooks title={HANDBOOK.title} />
}

const FORM = {
    title: setLanguages('Документы', 'Құжаттар', 'Documents'),
    path: '/form',
    render: () => <ListForms title={FORM.title} />
}

const HANDBOOKS = {
    title: setLanguages('Справочники', 'Әдебиеттер тізімі', 'Handbooks'),
    path: '/handbook/:name',
    render: props => <Handbook structure={handbooks[props.match.params.name]}/>
}

const FORM_CONTRACTS = {
    title: setLanguages('Контракты', 'Шарттар', 'Contracts'),
    path: '/form/contracts',
    render: () => <Handbook structure={contracts}/>
}

const FORM_OBJECTS = {
    title: setLanguages('Точки учета', 'Бухгалтерлік есеп', 'Objects'),
    path: '/form/objects',
    render: () => <Handbook structure={objects}/>
}

const FORM_ACTS = {
    title: setLanguages('Акты', 'Елшілердің істері', 'Acts'),
    path: '/form/acts',
    render: () => <Handbook structure={acts}/>
}

const FORM_SUBJECTS = {
    title: setLanguages('Субъекты', 'Тақырыптар', 'Subjects'),
    path: '/form/subjects',
    render: () => <Handbook structure={subjects}/>
}


export const PRIVATE_ROUTES = [HANDBOOK, FORM, HANDBOOKS, FORM_CONTRACTS, FORM_OBJECTS, FORM_ACTS, FORM_SUBJECTS];
export const MENU_LINKS = [HANDBOOK, FORM];
export const FORM_LINKS = [FORM_CONTRACTS, FORM_OBJECTS, FORM_ACTS, FORM_SUBJECTS];