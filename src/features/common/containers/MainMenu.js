import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Avatar } from "antd";
import { push } from 'react-router-redux';

import CommonMenu from '../components/CommonMenu';
import { bindActionCreators } from 'redux';

class MainMenu extends Component {
	_renderAvatar = () => {
		const {
			avatar: _avatar
		} = this.props;
		if (_avatar) 
			return <Avatar size={16} src={_avatar} />
		return <Avatar size={16} icon="user" />;
	}
	render () {
		const { push, pathname } = this.props;
		return (
			<CommonMenu 
				selected={pathname}
				cartCount={this.props.count}
				onClick={path => push(path)}
				top={
					<Menu.Item 
						className={pathname === '/user'?'ant-menu-item-selected': ''}
						key={'1'} 
						style={{ paddingRight: '20px!important', paddingLeft: '20px!important' }} 
						onClick={() => push('/user')}>
						{this._renderAvatar()}
					</Menu.Item>}
			/>
		);
	}
}

MainMenu.propTypes = {
	avatar: PropTypes.string,
	pathname: PropTypes.string,
	count: PropTypes.number,
	selected: PropTypes.string,
	push: PropTypes.func,
}

function getSafely(p, o) {
	return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);
}

const mapStateToProps = state => {
	const {
		cartReducer: {
			productReferId
		}
	} = state;
	return {
		pathname: getSafely(['routing', 'location', 'pathname'], state),
		avatar: getSafely(['userReducer', 'user', 'imageUrl'], state),
		count: productReferId.length,
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({push}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);