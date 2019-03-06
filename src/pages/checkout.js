import React from 'react';
import { 
	Layout,
} from 'antd';

import MainMenu from '../features/common/containers/MainMenu';
import CommonFooter from '../features/common/components/CommonFooter';
import ListCart from './../features/cart/containers/ListCart';

const {
	Content, Sider,
} = Layout;

/**
 * Checkout route component.
 */
export default function Checkout () {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
			
				collapsible
				collapsed={true}
				onCollapse={() => { }}
			>
				<MainMenu />
			</Sider>
			<Layout>
				<Content style={{ margin: '16px 16px' }}>
					<h2>Checkout</h2>
					<ListCart />
				</Content>
				<CommonFooter />
			</Layout>
		</Layout>
	);
}