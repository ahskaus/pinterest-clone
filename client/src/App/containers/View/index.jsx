import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import Button from '../../components/Button';
import Pin from '../../components/Pin';

import { fetchPins, deletePin } from '../../redux/actions';

import './styles.css';

class View extends PureComponent {


	constructor() {
		super();
		this.page = 0;
	}


	componentDidMount() {
		this.props.fetchPins(this.props.match.params.user);
	}

	render() {

		const { result, loading, error } = this.props.pins;

		if(error) return <div>Not found</div>;

		const items = result.map((pin) => <Pin
			key={pin.id} 
			{...pin}
			onDelete={this.props.deletePin}
			/>);

		//Hasmore isn't implemented on the API side --Syed
	    return  <InfiniteScroll
					dataLength={items.length}
					next={(page)=>this.props.fetchPins(this.props.match.params.user, ++this.page)}
					hasMore={!loading}
					loader={<h4>Loading...</h4>}
					endMessage={<div>end</div>}
					>
					{items}
				</InfiniteScroll>
	}
}

const mapStateToProps = (state) => {
	return {
		pins: state.pins
	};
};

export default connect(mapStateToProps, { fetchPins, deletePin })(View);