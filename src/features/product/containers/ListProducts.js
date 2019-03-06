import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import { getProductAsync } from './../redux/product.reducer';
import { addItemToCart as addProductToCart } from './../../cart/redux/cart.reducer';

import {
	Col, Row
} from 'antd';

import CardItem from './../components/CardItem';

/**
 * ListProducts containers.
 * Display all products
 */
class ListProducts extends Component {

	componentDidMount () {
		const {
			getProductAsync
		} = this.props;
		getProductAsync();
	}

	render() {
		const {
			productById,
			addProductToCart,
		} = this.props;
		return (

			<div style={{ marginTop: 14, padding: 24, background: '#fff', minHeight: 360 }}>
				<Row gutter={16}>
					{
						productById.map(item => 
							<Col key={item.id} span={4}>
								<CardItem 
									{...item} 
									handleCartClick={addProductToCart}
								/>
							</Col>
						)
					}
				</Row>
			</div>

		);
	}
}

ListProducts.propTypes = {
	getProductAsync: PropTypes.func,
	productById: PropTypes.array,
	addProductToCart: PropTypes.func,
}

const mapStateToProps = (state) => {
	const {
		productReducer
	} = state;

	const { productById } = productReducer

	// revert back object to array 
	const products = Object.keys(productById || {}).map(name => productById[name]);

	return {
		...productReducer,
		productById: products,
	}
};

const mapDispatchToProps = dispatch => bindActionCreators({
	getProductAsync,
	addProductToCart
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
