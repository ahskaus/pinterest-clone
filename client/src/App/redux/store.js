import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import history from '../architecture/history';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(connectRouter(history)(rootReducer),
	{},
	composeEnhancers(applyMiddleware(routerMiddleware(history),thunk))
);

export default store;