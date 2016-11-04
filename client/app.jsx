import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import cookie from 'react-cookie';

import {Router, Route, hashHistory} from 'react-router';

import Services from './views/Services';
import Replications from './views/Replications';
import Apps from './views/Apps';
import NodesClusterPage from './views/NodesClusterPage';
import NodeContainerPage from './views/NodeContainerPage';
import Login from './views/Login';
import DashBoardView from './views/DashBoardView';
import DeployBotView from './views/DeployBotView';

import injectTapEventPlugin from 'react-tap-event-plugin';
import {darkBlack} from 'material-ui/styles/colors';
import jwt from 'jwt-decode';

injectTapEventPlugin();

function decodeToken(token) {
let decoded = jwt(token);
return(
	decoded.roles[0].toString());
}
function redirectIfLoggedIn(nextState, replace, next) {
	const token = cookie.load('token');
	if(token) {
		if(decodeToken(token) === 'admin') {
			replace('/nodesclusterpage');
		}
		else {
			replace('/dashboard');
		}
	}
	next();
}
function redirectIfNotLoggedIn(nextState, replace, next) {
	const token = cookie.load('token');
	if(!token) { replace('/'); }
	next();
}
class App extends React.Component {
	render() {
		const muiTheme = getMuiTheme({
			palette: {
				textColor: darkBlack
			},
			appBar: {
				height: 80,
				color: '#4BC6B9'
			}
		});
		return(
			<div>
			<MuiThemeProvider muiTheme={muiTheme}>
			<div>
			<Router history={hashHistory}>
			<Route path='/' component={Login} onEnter={redirectIfLoggedIn}/>
			<Route path='/dashboard' component={DashBoardView} onEnter={redirectIfNotLoggedIn}/>
			<Route path='/deploy' component={DeployBotView} onEnter={redirectIfNotLoggedIn}/>
			<Route path='/apps' component={Apps} onEnter={redirectIfNotLoggedIn}/>
			<Route path='/services' component={Services} onEnter={redirectIfNotLoggedIn}/>
			<Route path='/services/replication' component={Replications} onEnter={redirectIfNotLoggedIn}/>
			<Route path='/nodesclusterpage' component={NodesClusterPage} onEnter={redirectIfNotLoggedIn}/>
			<Route
			path='/nodesclusterpage/:nodeId/:nodeName'
			component={NodeContainerPage}
			onEnter={redirectIfNotLoggedIn}/>
			</Router>
			</div>
			</MuiThemeProvider>
			</div>
			);
	}}
	ReactDOM.render(<App />, document.getElementById('container'));
