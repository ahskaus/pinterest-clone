import { API_URL } from '../architecture/config';

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

export function setUser(user) {
	return {
		type: SET_USER,
		user
	};
}

export function fetchPinUrl(tinyUrl) {
	return async (dispatch) => {

		dispatch({type:FETCH_PIN_URL_FROM_API_LOADING});

		const url =  `${API_URL}/api/v1/pin/${tinyUrl}`;
		try {
			const result = await fetch(
				url, {
					credentials: 'include'
				});
			dispatch({
				type: FETCH_PIN_URL_FROM_API_SUCCESS,
				result: await result.json()
			});
		} catch(e) {
			dispatch({type:FETCH_PIN_URL_FROM_API_ERROR});
		}
	}
}

export function fetchPins(user, page=0) {
	return async (dispatch) => {

		dispatch({type:FETCH_PINS_FROM_API_LOADING});

		const url =  `${API_URL}/api/v1/pins/${user}/${page}`;
		try {
			const result = await fetch(
				url, {
					credentials: 'include'
				});
			dispatch({
				type: FETCH_PINS_FROM_API_SUCCESS,
				result: await result.json()
			});
		} catch(e) {
			dispatch({type:FETCH_PINS_FROM_API_ERROR});
		}
	}
}

export function addPin(url) {
	return (dispatch) => {

		const apiUrl =  `${API_URL}/api/v1/pin`;
		try {
			fetch(
				apiUrl, {
					method: 'PUT',
					credentials: 'include',
					headers: {
			            "Content-Type": "application/json; charset=utf-8",
			        },
					body: JSON.stringify({ url })
				});
		} catch(e) {

		}
	}
}

export function deletePin(hash) {
	return (dispatch) => {

		const apiUrl =  `${API_URL}/api/v1/pin/${hash}`;
		try {
			fetch(
				apiUrl, {
					method: 'DELETE',
					credentials: 'include'
				});
		} catch(e) {

		}
	}
}

