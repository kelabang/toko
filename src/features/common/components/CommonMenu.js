import React from 'react';
import PropTypes from 'prop-types';
import {
	Menu, Icon, Badge
} from 'antd';

import './CommonMenu.css';

export default function CommonMenu ({top, cartCount = 0, onClick, selected}) {
	return (
		<Menu
			style={{
				position: 'fixed'
			}}
			theme="dark" 
			mode="inline"
		>
			{top}
			<Menu.Item key={'2'} className={selected === '/' ? 'ant-menu-item-selected' : ''} onClick={() => onClick('/')}>
				<Icon type="shop" />
				<span>Shopping</span>
			</Menu.Item>
			<Menu.Item 
				key={'3'} 
				className={selected === '/checkout' ? 'ant-menu-item-selected' : ''} 
				onClick={() => onClick('/checkout')}>
				<Badge count={cartCount} />
				<Icon type="shopping-cart" />
				<span>Your Cart</span>
			</Menu.Item>
		</Menu>
	);
}

CommonMenu.propTypes = {
	top: PropTypes.object,
	cartCount: PropTypes.number,
	onClick: PropTypes.func,
	selected: PropTypes.string
}