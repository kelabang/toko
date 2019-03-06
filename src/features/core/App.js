import React, { Component, Fragment, Suspense } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.css';
import './App.css';

import IndexPage from './../../pages/index';
import Checkout from './../../pages/checkout';
import User from './../../pages/user';

import store, {history} from './redux/store';

class App extends Component {
	render() {
		return (
			<Fragment>
				<Provider store={store}>
					<ConnectedRouter store={store} history={history}>
						<Suspense fallback={<div>Loading...</div>}>
							<Switch>
								<Route exact path="/" component={IndexPage} />
								<Route path="/checkout" component={Checkout} />
								<Route path="/user" component={User} />
							</Switch>
						</Suspense>
					</ConnectedRouter>
				</Provider>
			</Fragment>
		);
	}
}

export default App;