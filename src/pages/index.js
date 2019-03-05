import React from 'react';

import {
	Layout
} from 'antd';

import MainMenu from '../features/common/containers/MainMenu';
import CommonFooter from '../features/common/components/CommonFooter';
import ListProducts from './../features/product/containers/ListProducts';

const {
	Content, Sider,
} = Layout;

export default function IndexPage () {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
			
				collapsible
				collapsed={true}
				onCollapse={() => {}}
			>
				<MainMenu />
			</Sider>
			<Layout>
				<Content style={{ margin: '16px 16px' }}>
					<h2>Shopping</h2>
					<ListProducts />
				</Content>
				<CommonFooter />
			</Layout>
		</Layout>
	);
}