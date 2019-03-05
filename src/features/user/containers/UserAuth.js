import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';

import { Card } from 'antd';

import { setGoogleUser } from './../redux/user.reducer';
import { bindActionCreators } from 'redux';

const { Meta } = Card; 

class UserAuth extends Component {
	responseGoogle = (resp) => {
		window.console.log(resp);
		const {error} = resp;
		const { setGoogleUser } = this.props;
		if(!error) {
			// lakukan dispatch
			setGoogleUser(resp);
		}
	}
	_renderConnect = () => {
		return (
			<div style={{ marginTop: 14, padding: 36, background: '#fff', minHeight: 360, border: 0 }}>
				<Card title="Connect Your Account">
					<GoogleLogin
						clientId="95200833399-n2kvqo4oq2qvpfhkugegse9s3q9pgjce.apps.googleusercontent.com"
						buttonText="Connect with Google"
						onSuccess={this.responseGoogle}
						onFailure={this.responseGoogle}
					/>
				</Card>
			</div >
		);
	}
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