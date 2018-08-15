import { combineReducers } from 'redux';

import {
	SET_USER,

	FETCH_PINS_FROM_API_LOADING,
	FETCH_PINS_FROM_API_SUCCESS,
	FETCH_PINS_FROM_API_ERROR,

	FETCH_PIN_URL_FROM_API_LOADING,
	FETCH_PIN_URL_FROM_API_SUCCESS,
	FETCH_PIN_URL_FROM_API_ERROR,
	
	ADD_PIN,
	DELETE_PIN
} from './action-types';


const initialStateUser = null;

const userReducer = (state = initialStateUser, action) => {
	switch(action.type) {
		case SET_USER:
			return action.user
		default:
			return state;
	}
};

const initialStatePinUrl = {
	loading: true,
	error: false,
	url: null
};

const pinUrlReducer = (state = initialStatePinUrl, action) => {
	switch(action.type) {
		case FETCH_PIN_URL_FROM_API_LOADING:
			return {
				...state,
				url: null,
				loading: true,
				error: false
			};
		case FETCH_PIN_URL_FROM_API_SUCCESS:
			return {
				...state,
				url: action.result.image_url,
				loading: false,
				error: false
			};
		case FETCH_PIN_URL_FROM_API_ERROR:
			return {
				...state,
				url: null,
				loading: false,
				error: true
			};
		default:
			return state;
	}
};


const initialStatePins = {
	loading: true,
	error: false,
	result: []
};

const pinsReducer = (state = initialStatePins, action) => {
	switch(action.type) {
		case FETCH_PINS_FROM_API_LOADING:
			return {
				...state,
				loading: true,
				error: false
			};
		case FETCH_PINS_FROM_API_SUCCESS:
			return {
				...state,
				result: [...state.result, ...action.result],
				loading: false,
				error: false
			};
		case FETCH_PINS_FROM_API_ERROR:
			return {
				...state,
				result: [],
				loading: false,
				error: true
			};
		default:
			return state;
	}
};

export default combineReducers({
	user: userReducer,
	pinUrl: pinUrlReducer,
	pins: pinsReducer
});
