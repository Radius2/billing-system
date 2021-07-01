import React, {useContext, useState} from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {LanguageContext} from '../../App';
import Handbook from '../Handbook/Handbook';
import ElectricityBalances from '../Forms/ElectricityBalances/ElectricityBalances';
import {getHandbooks} from '../../util/handbook';
import Grid from '@material-ui/core/Grid';
import DocumentsList from '../Forms/DocumentsList/DocumentsList';

export default function Content() {
  const [links] = useState(getHandbooks());
  const {lang} = useContext(LanguageContext);
  return (
      <Switch>
        <Route path={'/handbook'} exact>
          <Grid direction='column' spacing={2} container alignContent='center'>
            {links.map((handbook, index) => (
                <Link key={handbook.path} to={handbook.path}>{index + 1}. {handbook.header(lang)}</Link>))}
          </Grid>
        </Route>
        <Route path={'/handbook/:name'} exact component={Handbook}/>
        <Route path='/electricity_balances' exact component={ElectricityBalances}/>
        <Route path='/electricity_balances/:name' exact component={DocumentsList}
        />
      </Switch>
    )
}