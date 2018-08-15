import React, { PureComponent } from 'react';

import './styles.css';

export default ({ max, value, onChange, placeholder }) => {

	const props = {};
	if(max) {
		props.max = max;
		props.min = 0;
		props.type = 'number';
		props.steps = '0.01';
	}

	return (
		<div className='input-component'>
			<input
				{...props}
				className='input'
				placeholder={placeholder}
				value={value}
				maxLength='10'
				onChange={onChange || Function.prototype}
			/>
		</div>
	);
}