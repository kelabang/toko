import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.css';
import './App.css';

import IndexPage from './../../pages/index';
import Checkout from './../../pages/checkout';
import UserPage from './../../pages/user';
import store, {history} from './redux/store';

class App extends Component {
	render() {
		return (
			<Fragment>
				<Provider store={store}>
					<ConnectedRouter store={store} history={history}>
						<div>
							<Switch>
								<Route exact path="/" render={() => <IndexPage />} />
								<Route path="/checkout" render={() => <Checkout />} />
								<Route path="/user" render={() => <UserPage />} />
							</Switch>
						</div>
					</ConnectedRouter>
				</Provider>
			</Fragment>
		);
	}
}

export default App;