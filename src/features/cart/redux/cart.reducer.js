import update from 'immutability-helper';
import { createAction, createReducer } from 'redux-act';
import { push } from 'react-router-redux';

import { message } from 'antd';

const defaultState = {
	is_fetching: false,
	err: '',
	productReferId: []
};

const [reset, add, request, failure, success] = [
	'RESET_CART_ERROR',
	'ADD_CART_ITEM',
	'SUBMIT_CART_REQUEST',
	'SUBMIT_CART_FAILURE',
	'SUBMIT_CART_SUCCESS',
].map(createAction);

const reducer = createReducer({
	[reset]: (state) => {
		return update(state, {
			err: {$set: ''}
		});
	},
	[add]: (state, {id}) => {
		return update(state, {
			productReferId: {$push: [id]}
		})
	},
	[request]: state => update(state, {
		is_fetching: { $set: true },
		err: {$set: ''}
	}),
	[failure]: (state, { err }) => update(state, {
		is_fetching: { $set: false },
		err: { $set: err }
	}),
	[success]: (state) => update(state, {
		is_fetching: { $set: false },
		productReferId: { $set: [] }
	}),
}, defaultState);

function postCartData() {
	return new Promise((res) => {
		setTimeout(() => res('success'), 2000);
	});
}

export {
	reset,
};

export function addItemToCart (data) {
	return (dispatch) => {
		message.success('Item Added to Cart');
		dispatch(add(data));
	} 
}

export function postCartAsync () {
	return (dispatch, getState) => {
		const {
			userReducer: {
				user
			}
		} = getState();
		dispatch(request());
		if(!user) {
			dispatch(failure({ err: 'unauthorized' }));
			return setTimeout(() => dispatch(push('/user')), 1000);
		}
		return postCartData().then(() => {
			dispatch(push('/'));
			message.success('Checkout Success');
			return dispatch(success());
		}).catch(err => {
			dispatch(failure({err}))
		})
	}
}

export default reducer;
