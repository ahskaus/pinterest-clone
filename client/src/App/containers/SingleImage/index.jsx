import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';

import { fetchPinUrl } from '../../redux/actions';

class SingleImage extends PureComponent {

	componentDidMount() {
		this.props.fetchPinUrl(this.props.match.params.tinyUrl);
	}

	render() {

		const { url, loading, error } = this.props.pinUrl;

		if(loading) return <div>Loading...</div>;
		if(error) return <div>Not found</div>;

		return <img src={url}></img>;
	}
}

const mapStateToProps = (state) => {
	return {
		pinUrl: state.pinUrl
	};
};

export default connect(mapStateToProps, { fetchPinUrl })(SingleImage);