import React from 'react';
import {Route, Switch} from 'react-router';
import Handbook from '../Handbook/Handbook';
import {getForm} from '../../api/api';

export default function Content() {
    return (
        <Switch>
            <Route path={'/handbook/:name'} component={Handbook}/>
        </Switch>
    )
}