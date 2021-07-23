import React from 'react';
import {Route, Switch} from 'react-router';
import {PRIVATE_ROUTES} from '../../routes';


export default function Content() {
    return (
        <Switch>
            {PRIVATE_ROUTES.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    render={route.render}
                    exact
                />))}
        </Switch>
    );
}
