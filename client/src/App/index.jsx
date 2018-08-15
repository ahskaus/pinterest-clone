import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store from './redux/store';
import history from './architecture/history';

import Main from './containers/Main';

const App = () => 
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Main />
		</ConnectedRouter>
	</Provider>;

export default App;

render(<App />, document.getElementById('app'));