import React from 'react';

import './styles.css';

export default ({ text, disabled, onClick }) => (
	<div className="button-component">
		<button className="button" onClick={onClick} disabled={disabled}>{text}</button>
	</div>
);