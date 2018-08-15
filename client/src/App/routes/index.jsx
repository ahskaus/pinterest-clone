import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../containers/Home';
import Add from '../containers/Add';
import View from '../containers/View';
import SingleImage from '../containers/SingleImage';

export default ({ authenticated }) => (
	<Switch>
		<Route exact path="/" render={(props)=> <Home {...props} />} />
		<Route key={authenticated ? 'yes' : 'no'} exact path="/view/:user" render={(props) => <View {...props} />} />
		<Route exact path="/add" render={(props) => (authenticated ? <Add {...props} /> : <Redirect to="/" />)} />
		<Route exact path="/:tinyUrl" render={(props) => <SingleImage {...props} />} />
		<Route exact path="/404" render={() => (<div>Not Found</div>)} />
		<Route render={() => (<div>Not Found</div>)} />
    </Switch>
);