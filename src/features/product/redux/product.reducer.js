import update from 'immutability-helper';
import { createAction, createReducer } from 'redux-act';

import productMock from './product.mock.json'

const defaultState = {
	is_fetching: false,
	err: '',
	productById: null
};

const [request, failure, success] = [
	'ADD_PRODUCT_REQUEST',
	'ADD_PRODUCT_FAILURE',
	'ADD_PRODUCT_SUCCESS',
].map(createAction);

const reducer = createReducer({
	[request]: state => update(state, {
		is_fetching: { $set: true },
	}),
	[failure]: (state, {err}) => update(state, {
		is_fetching: { $set: false },
		err: {$set: err}
	}),
	[success]: (state, {data}) => update(state, {
		is_fetching: { $set: false },
		productById: {$set: data}
	}),
}, defaultState);

function getProductData () {
	return Promise.resolve(productMock);
}

function productArrayToMap (products) {
	return products.reduce((acc, current) => {
		acc[current['id']] = current; 
		return acc;
	}, {});
}

export function getProductAsync() {
	return (dispatch) => {
		dispatch(request());
		return getProductData().then(resp => {
			const respObj = productArrayToMap(resp);
			dispatch(success({data: respObj}));
		}).catch(() => {
			dispatch(failure({err: 'something is wrong'}));
		});
	}
}

export default reducer;
