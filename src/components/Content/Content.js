import React, {useContext, useState} from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {LanguageContext} from '../../App';
import Contracts from '../Forms/FormComponents/Contracts';
import ObjectContractBinding from '../Forms/FormComponents/ObjectContractBinding';
import Objects from '../Forms/FormComponents/Objects';
import Handbook from '../Handbook/Handbook';
import {getHandbooks} from '../../util/handbook'
import Grid from '@material-ui/core/Grid';

export default function Content() {
    const [links] = useState(getHandbooks())
    const {lang} = useContext(LanguageContext)
    return (
        <Switch>
            <Route path={'/handbook'} exact>
                <Grid direction='column' spacing={2} container alignContent='center'>
                {links.map((handbook, index)=> (
                    <Link key={handbook.path} to={handbook.path}>{index+1}. {handbook.header(lang)}</Link>))}
                </Grid>
            </Route>
            <Route path={'/handbook/:name'} exact component={Handbook}/>
            <Route path={'/form/contracts'} exact component={Contracts}/>
            <Route path={'/form/objects'} exact component={Objects}/>
            <Route path={'/form/objcontract'} exact component={ObjectContractBinding}/>
        </Switch>
    )
}