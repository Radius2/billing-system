import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link as RouterLink} from 'react-router-dom';

const LinkRouter = (props) => <Link {...props} component={RouterLink}/>;

export default function RouterBreadcrumbs({location}) {
    const pathnames = location.pathname.split('/').filter((x) => x);
    console.log(pathnames)
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `${pathnames[index]}`;
                return last ? (
                    <Typography color="textPrimary" key={to}>
                        {to}
                    </Typography>
                ) : (
                    <LinkRouter color="inherit" to={'/' + pathnames.slice(0, index + 1).join('/')} key={to}>
                        {to}
                    </LinkRouter>
                );
            })}
        </Breadcrumbs>
    );
}

