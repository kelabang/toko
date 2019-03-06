import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';

import { Card } from 'antd';

import { setGoogleUser } from './../redux/user.reducer';
import { bindActionCreators } from 'redux';

const { Meta } = Card; 

/**
 * UserAuth container.
 * Connect account user and show the profile user.
 */
class UserAuth extends Component {
	_responseGoogle = (resp) => {
		const {error} = resp;
		const { setGoogleUser } = this.props;
		if(!error) {
			setGoogleUser(resp); // set google user to redux store
		}
	}
	/**
	 * display google login if user not found yet
	 */
	_renderConnect = () => {
		return (
			<div style={{ marginTop: 14, padding: 36, background: '#fff', minHeight: 360, border: 0 }}>
				<Card title="Connect Your Account">
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
						buttonText="Connect with Google"
						onSuccess={this._responseGoogle}
						onFailure={this._responseGoogle}
					/>
				</Card>
			</div >
		);
	}
	/**
	 * display profile of user
	 */
	_renderUser = () => {
		const {
			user: {
				name,
				imageUrl,
				email
			}
		} = this.props;
		return (
			<div style={{ marginTop: 14, padding: 36, background: '#fff', minHeight: 360, border: 0 }}>
				<Card 
					style={{ maxWidth: 360 }}
					title={'Google User'}
					cover={<img src={imageUrl} alt="avatar user" />}
				>
					<Meta
						title={name}
						description={email}
					/>
				</Card>
			</div >
		);
	}
	render () {
		const { user } = this.props;
		return !user? this._renderConnect(): this._renderUser();
	}
}

UserAuth.propTypes = {
	setGoogleUser: PropTypes.func,
	user: PropTypes.object,
};

const mapStateToProps = state => {
	const {
		userReducer: {
			is_fetching: loading,
			user,
		}
	} = state;
	return {
		loading,
		user: user,
	};
}

const mapDispatchToProps = dispatch => bindActionCreators({
	setGoogleUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);