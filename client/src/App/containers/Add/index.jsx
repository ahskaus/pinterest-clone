import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';

import { addPin } from '../../redux/actions';

import './styles.css';

class Add extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			url: '',
			added: false
		};
	}

	handleChange = (event) => {
		this.setState({url: event.target.value, added: false});
	}

	handleAdd = (event) => {
		//Right now it just adds and resets the field
		//In actual app, you'd see an adding loader,
		//and then a fail/success message,
		//along with another input box to add another image
		//--Syed
		this.props.addPin(this.state.url);
		this.setState({ url: '', added: true });
	}

	render() {

		const { url, added } = this.state;

		return (
			<div className="add-container">
				<div className="url">
					<input 
						type="text"
						value={url}
						onChange={this.handleChange}
					/>
					{ added ? <div>Added</div> : null }
				</div>
				<div className="add">
					<Button
						text={"Add"}
						onClick={this.handleAdd}
						disabled={!url.length}
					/>
				</div>
			</div>
		);
	}

}

export default connect(null, { addPin })(Add);