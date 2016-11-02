import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import Services from './views/Services';
import Replications from './views/Replications';
import Apps from './views/Apps';
import NodesClusterPage from './views/NodesClusterPage';
import NodeContainerPage from './views/NodeContainerPage';
import Login from './views/Login';

import $ from 'jquery';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Flex from '../node_modules/flexboxgrid/css/flexboxgrid.css';

import {darkBlack} from 'material-ui/styles/colors';


injectTapEventPlugin();

class App extends React.Component{

	render(){
		const muiTheme = getMuiTheme({
			palette: {
				textColor: darkBlack,
			},
			appBar: {
				height: 80,
				color: "#4BC6B9"
			},
		});
		return(
			<div>
			<MuiThemeProvider muiTheme={muiTheme}>
			<div>
			<Router history={hashHistory}>
			<Route path='/' component={Login}/>
			<Route path='/apps' component={Apps}/>

			<Route path='/services' component={Services} />
			<Route path='/services/replication' component={Replications} />
			<Route path='/nodesclusterpage' component={NodesClusterPage} />
			<Route path='/nodesclusterpage/:nodeId/:nodeName' component={NodeContainerPage} />
			</Router>
			</div>
			</MuiThemeProvider>
			</div>
			);
	}
};

ReactDOM.render(<App />,document.getElementById('container'));