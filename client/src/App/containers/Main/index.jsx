import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import TopBar from '../../components/TopBar';
import Routes from '../../routes';


const Main = ({ user }) => (
	<div>
		<TopBar />
		<Routes authenticated={user} />
	</div>
);

export default withRouter(connect(({ user }) => ({ user }))(Main));