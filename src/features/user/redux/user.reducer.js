import update from 'immutability-helper';
import { createAction, createReducer } from 'redux-act';

/*
	declare initial state
*/
const defaultState = {
	is_fetching: false,
	err: '',
	user: null
};

/*
	generate action creator
*/
const [setUser, request, failure, success] = [
	'SET_USER_PROFILE',
	'ADD_USER_REQUEST',
	'ADD_USER_FAILURE',
	'ADD_USER_SUCCESS',
].map(createAction);

/*
	map action with reducer
*/
const reducer = createReducer({
	[setUser]: (state, {user}) => update(state, {
		user: {$set: user}
	}),
	[request]: state => update(state, {
		is_fetching: { $set: true },
	}),
	[failure]: (state, { err }) => update(state, {
		is_fetching: { $set: false },
		err: { $set: err }
	}),
	[success]: (state, { data }) => update(state, {
		is_fetching: { $set: false },
		user: { $set: data }
	}),
}, defaultState);

/*
	set data google user to our state
*/
export function setGoogleUser (googleUser) {
	return dispatch => {
		const {
			accessToken,
			profileObj,
			googleId,
		} = googleUser;
		
		// for future use
		localStorage.setItem('at', accessToken);
		localStorage.setItem('gid', googleId);

		dispatch(setUser({user: profileObj}));
	}
}

export function getGoogleUserAsync() {
	return () => {
		// const accessToken = localStorage.getItem('at');
	}
}

/*
	export the reducer object
*/
export default reducer;
