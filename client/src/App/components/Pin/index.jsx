import React from 'react';

import './styles.css';

export default ({ src, id, url, onDelete }) => (
	<div className='pin-component'>
		<img src={src}></img>
		{url ? <div>{url}</div> : null}
		{url ? <div onClick={() => onDelete(id)}>delete?</div> : null}
	</div>
);