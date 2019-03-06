import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import numbro from 'numbro';
import { Link } from 'react-router-dom';
import {
	List, Button, Spin, Alert
} from 'antd';
import { bindActionCreators } from 'redux';

import {
	postCartAsync,
	reset,
	clearCart,
} from './../redux/cart.reducer';

/**
 * ListCart container.
 * show all item in the cart
 */
class ListCart extends Component {
	// format number to price with 2 decimal point
	_formatToPrice = (price) => {
		return numbro(price).formatCurrency({ mantissa: 2 });
	}
	_renderContent = () => {
		const {
			products,
			total,
			postCartAsync,
			clearCart,
		} = this.props;
		const templateTotal = [
			{
				title: 'Total',
				total: total
			}
		];
		return (
			<Fragment>
				<List
					itemLayout="horizontal"
					dataSource={products}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								title={<a href="/">{item.name}</a>}
							/>
							<div>{item.quantity}@{this._formatToPrice(item.price)}</div>
						</List.Item>
					)}
				/>
				{
					!!total && <List
						itemLayout="horizontal"
						dataSource={templateTotal}
						loadMore={<div style={{
							textAlign: 'right', marginTop: 12, height: 32, lineHeight: '32px',
						}}
						>
							<Button style={{marginRight: 30}} onClick={clearCart}>Clear Cart</Button>
							<Button type="primary" onClick={postCartAsync}>Checkout</Button>
						</div>}
						renderItem={item => (
							<List.Item >
								<List.Item.Meta
									avatar={null}
									title={<a href="/"><b>{item.title}</b></a>}
									description=""
								/>
								<div><b>{this._formatToPrice(item.total)}</b></div>
							</List.Item>
						)}
					/>
				}
			</Fragment>
		);
	}
	_renderError = () => {
		const {
			err
		} = this.props;
		let error = null;
		if (err === 'unauthorized') {
			error = (<Alert
				message="Warning"
				description={<Fragment>
					You need to login first. We will redirecting you.. or <Link to={'user'}> Click here </Link>
				</Fragment>}
				type="warning"
				showIcon
			/>);
		} else if (err) {
			error = (<Alert
				message="Error"
				description={err}
				type="error"
				showIcon
			/>);
		}
		return error;
	}
	componentWillUnmount() {
		this.props.reset(); // reset err value
	}
	render() {
		const {
			loading,
		} = this.props;
		return (
			<div style={{ marginTop: 14, padding: 24, background: '#fff', minHeight: 360 }}>
				{this._renderError()}
				{
					loading ?
						<Spin>{this._renderContent()}</Spin> : // lock the form with spinner if still processing
						this._renderContent()
				}
			</div>
		);
	}
}

ListCart.propTypes = {
	products: PropTypes.array,
	total: PropTypes.number,
	postCartAsync: PropTypes.func,
	clearCart: PropTypes.func,
	reset: PropTypes.func,
	loading: PropTypes.bool,
	history: PropTypes.object,
	err: PropTypes.string,
}

const mapStateToProps = state => {
	const {
		productReducer,
		cartReducer,
	} = state;
	const { err, is_fetching: loading } = cartReducer;

	/* 
		calculate total products price dynamicaly
	*/
	let total = 0;
	const products = [];

	let unique = [...new Set(cartReducer.productReferId)]; // get unique product id

	unique.map(function (id) {
		const quantity = cartReducer.productReferId.filter(i => i === id).length; // get the quantity of product in the cart
		const product = productReducer.productById[id]; // get product object 
		total = total + (quantity * parseFloat(product.price)); // accumulate total price with quantity
		products.push({
			...product,
			quantity
		});
		return id;
	})

	return {
		err,
		loading,
		products,
		total
	}
};

const mapDispatchToProps = dispatch => bindActionCreators({
	postCartAsync,
	reset,
	clearCart,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListCart);