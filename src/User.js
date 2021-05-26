import React from 'react'
import {Route} from 'react-router';
import Sidebar from './components/Sidebar/Sidebar';

export default function User(props){
    return(
        <Sidebar location={props.location}>
            <Route path='/1'><div>1</div></Route>
            <Route path='/2'><div>2</div></Route>
        </Sidebar>
    )
}