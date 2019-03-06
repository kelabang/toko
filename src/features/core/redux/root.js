import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import productReducer from './../../product/redux/product.reducer';
import cartReducer from './../../cart/redux/cart.reducer';
import userReducer from './../../user/redux/user.reducer';

/*

	mapping all reducers here

*/

export default combineReducers({
	routing: routerReducer,
	productReducer,
	cartReducer,
	userReducer,
});