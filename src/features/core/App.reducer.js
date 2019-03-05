/*
* @Author: d4r
* @Date:   2018-02-23 02:50:50
* @Last Modified by:   Imam
* @Last Modified time: 2018-06-11 02:46:49
*/

import update from 'immutability-helper';
import { createAction, createReducer } from 'redux-act';

const defaultState = {
	is_fetching: false,
};

const [request, failure, success] = [
	'ADD_FEED_REQUEST',
	'ADD_FEED_FAILURE',
	'ADD_FEED_SUCCESS',
].map(createAction);


const reducer = createReducer({
	[request]: state => update(state, {
		is_fetching: { $set: true },
	}),
	[failure]: state => update(state, {
		is_fetching: { $set: false },

	}),
	[success]: state => update(state, {
		is_fetching: { $set: false },
	}),
}, defaultState);

export function postAsync() {
	return () => Promise.resolve();
}

export default reducer;
