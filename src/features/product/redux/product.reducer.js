import update from 'immutability-helper';
import { createAction, createReducer } from 'redux-act';

/* 
	JSON data product mockup
*/
import productMock from './product.mock.json'

/*
	declare initial state
*/
const defaultState = {
	is_fetching: false,
	err: '',
	productById: null
};

/*
	generate action creator
*/
const [request, failure, success] = [
	'ADD_PRODUCT_REQUEST',
	'ADD_PRODUCT_FAILURE',
	'ADD_PRODUCT_SUCCESS',
].map(createAction);

/*
	map action with reducer
*/
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

/*
	mock API request with data mock
*/
function getProductData () {
	return Promise.resolve(productMock);
}

/*
	convert product array to object
*/
function productArrayToMap (products) {
	return products.reduce((acc, current) => {
		acc[current['id']] = current; 
		return acc;
	}, {});
}

/*
	get all product and set to redux state
*/
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

/*
	export the reducer object
*/
export default reducer;
