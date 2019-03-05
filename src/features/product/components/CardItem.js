import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button } from 'antd';
import numbro from 'numbro';

const { Meta } = Card;

export default function CardItem ({id, name, price, image, avatar, handleCartClick}) {
	return (
		<Card
			hoverable
			style={{
				marginBottom: 18
			}}
			cover={<img alt="example" src={image} />}
			actions={[
				<Button key="1" onClick={() => handleCartClick({
					id,
					name,
					price,
					image,
					avatar,
				})}>
					<Icon type="shopping-cart" /> Add to cart
				</Button>
			]}
		>
			<Meta
				title={name}
				description={numbro(price).formatCurrency({ mantissa: 2 })}
			/>
		</Card>
	);
}

CardItem.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	price: PropTypes.number,
	avatar: PropTypes.string,
	image: PropTypes.string,
	handleCartClick: PropTypes.func,
}

CardItem.defaultProps = {
	id: 0,
	name: '',
	price: 0,
	image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
	avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
	handleCartClick: () => {},
}