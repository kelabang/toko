import update from 'immutability-helper';
import { createAction, createReducer } from 'redux-act';
import { push } from 'react-router-redux';

import { message } from 'antd';

/*
	declare initial state
*/
const defaultState = {
	is_fetching: false,
	err: '',
	productReferId: []
};

/*
	generate action creator
*/
const [clear, reset, add, request, failure, success] = [
	'clear_CART_ITEM',
	'RESET_CART_ERROR',
	'ADD_CART_ITEM',
	'SUBMIT_CART_REQUEST',
	'SUBMIT_CART_FAILURE',
	'SUBMIT_CART_SUCCESS',
].map(createAction);

/*
	map action with reducer
*/
const reducer = createReducer({
	[clear]: (state) => {
		return update(state, {
			productReferId: {$set: []},
			err: {$set: ''}
		});
	},
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


/*
	mock submit checkout process
*/
function postCartData() {
	return new Promise((res) => {
		setTimeout(() => res('success'), 2000);
	});
}


/*
	export sync reducer
*/
export {
	reset,
};

/*
	clear cart 
*/
export function clearCart() {
	return dispatch => {
		message.success(`Cart has been cleared`);
		dispatch(clear());
	}
}


/*
	add item to cart state
*/
export function addItemToCart (data) {
	return (dispatch) => {
		message.success(`"${data.name}" has been added to cart`);
		dispatch(add(data));
	} 
}

/*
	checkout process
*/
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

/*
	export the reducer object
*/
export default reducer;
