import React, { useContext, useState } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../App';
import { structureTable as contracts } from '../Forms/formStructures/contractStructure';
import { structureTable as objects } from '../Forms/formStructures/objectStructure';
import { structureTable as objContracts } from '../Forms/formStructures/objContractsStructure';
import { structureTable as acts } from '../Forms/formStructures/actStructure';
import Handbook from '../Handbook/Handbook';
import { getHandbooks, handbooks } from '../../util/handbook';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

export default function Content() {
  const [links] = useState(getHandbooks());
  const { lang } = useContext(LanguageContext);
  return (
    <Switch>
      <Route path={'/handbook'} exact>
        <Grid direction='column' spacing={2} container alignContent='center'>
          {links.map((handbook, index) => (
            <Link style={{ textDecoration: 'none' }} key={handbook.path} to={handbook.path}>
              <Typography color='textPrimary' variant='body2'>
                {index + 1}. {handbook.header(lang)}
              </Typography>
            </Link>
          ))}
        </Grid>
      </Route>
      <Route
        path={'/handbook/:name'}
        render={props => {
          return <Handbook structure={handbooks[props.match.params.name]} />;
        }}
      />
      <Route path={'/form/contracts'}>
        <Handbook structure={contracts} />
      </Route>
      <Route path={'/form/objects'}>
        <Handbook structure={objects} />
      </Route>
      <Route path={'/form/objcontract'}>
        <Handbook structure={objContracts} />
      </Route>
      <Route path={'/form/acts'}>
        <Handbook structure={acts} />
      </Route>
    </Switch>
  );
}
