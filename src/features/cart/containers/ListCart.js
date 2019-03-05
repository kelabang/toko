import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import numbro from 'numbro';
import {Link} from 'react-router-dom';
import {
	List, Button, Spin, Alert
} from 'antd';
import { bindActionCreators } from 'redux';

import {
	postCartAsync,
	reset
} from './../redux/cart.reducer';

class ListCart extends Component {
	_formatToPrice = (price) => {
		return numbro(price).formatCurrency({mantissa: 2});
	}
	_renderContent = () => {
		const {
			products,
			total,
			postCartAsync,
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
							textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
						}}
						>
							<Button onClick={postCartAsync}>Checkout</Button>
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
	componentWillUnmount () {
		this.props.reset();
	}
	render () {
		const {
			loading,
		} = this.props;
		return (
			<div style={{ marginTop: 14, padding: 24, background: '#fff', minHeight: 360 }}>
				{this._renderError()}
				{
					loading? 
						<Spin>{this._renderContent()}</Spin>:
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
	let total = 0;
	const products = [];
	let unique = [...new Set(cartReducer.productReferId)]; 
	unique.map(function (id) {
		const quantity = cartReducer.productReferId.filter(i => i === id).length;
		const product = productReducer.productById[id];
		total = total + (quantity * parseFloat(product.price)); 
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
	reset
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListCart);