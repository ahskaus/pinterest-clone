import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import socket from 'socket.io-client';

import { API_URL } from '../../architecture/config';
import history from '../../architecture/history';

import { setUser, fetchPins } from '../../redux/actions';

import './styles.css';

class TopBar extends PureComponent {

	constructor() {
		super();
		this.state = {disabled: false};
		this.popup = null;
		this.socket = socket(API_URL);
	};

	componentDidMount() {
		this.socket.on('user', user => {
			this.popup.close();
			this.props.setUser(user.user);
		});
	}

	checkPopup = () => {
		const check = setInterval(() => {
			const { popup } = this;
			if (!popup || popup.closed || popup.closed === undefined) {
				clearInterval(check);
				this.setState({disabled: false});
			}
		},1000);
	}

	openPopup = () => {
		const width = 600; const height = 600;
		const left = (window.innerWidth - width)/2;
		const top = (window.innerHeight - height)/2;

		const url = `${API_URL}/login?clientId=${this.socket.id}`;

		return window.open(url, '',
			`toolbar=no, location=no, directories=no, status=no, menubar=no,
			scrollbars=no, resizable=no, copyhistory=no, width=${width},
			height=${height}, top=${top}, left=${left}`
		);
	}

	authenticateGithub = () => {
		if (!this.state.disabled) {  
			this.popup = this.openPopup();
			this.checkPopup();
			this.setState({disabled: true});
		}
  	}

	render() {

		const { user } = this.props;

		return (
			<nav className="top-bar-component">
				<ul className="main-nav">
					<li>
					{
						user ?
						<span onClick={()=>history.push(`/add`)}>Add pins</span> :
						null
					}
					</li>
					<li>
					{
						user ?
						<span onClick={()=>history.push(`/view/${user}`)}>{user}</span> :
						<a href="#" onClick={this.authenticateGithub}>Login</a>
					}
					</li>
				</ul>
			</nav>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { setUser, fetchPins })(TopBar);