import React from 'react';
import {Route, Switch} from 'react-router';
import Handbook from '../Handbook/Handbook';

export default function Content() {
    return (
        <Switch>
            <Route path={'/handbook'} exact><div>asdasd</div></Route>
            <Route path={'/handbook/:name'} component={Handbook}/>
        </Switch>
    )
}