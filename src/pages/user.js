import React from 'react';

import {
	Layout
} from 'antd';

import MainMenu from '../features/common/containers/MainMenu';

import UserAuth from './../features/user/containers/UserAuth';

import CommonFooter from '../features/common/components/CommonFooter';

const {
	Content, Sider,
} = Layout;

/**
 * User route component.
 */
export default function User() {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				collapsible
				collapsed={true}
			>
				<MainMenu />
			</Sider>
			<Layout>
				<Content style={{ margin: '16px 16px' }}>
					<h2>Your Account</h2>
					<UserAuth />
				</Content>
				<CommonFooter />
			</Layout>
		</Layout>
	);
}