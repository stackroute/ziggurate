import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import Services from './views/Services';
import Replications from './views/Replications';
import Apps from './views/Apps';
import NodeDashBoardPage from './views/NodeDashBoardPage';
import NodeGridListPage from './views/NodeGridListPage';
import NodeContainerPage from './views/NodeContainerPage';
import Login from './views/Login';

import injectTapEventPlugin from 'react-tap-event-plugin';
import Flex from '../node_modules/flexboxgrid/css/flexboxgrid.css';

injectTapEventPlugin();

class App extends React.Component{

	render(){
		return(
			<div>
			<MuiThemeProvider>
			<div>
			<Router history={browserHistory}>
			<Route path='/' component={Login}/>
			<Route path='/apps' component={Apps}/>

			<Route path='/services' component={Services} />
			<Route path='/services/replication' component={Replications} />

			<Route path='/nodedashboardpage' component={NodeDashBoardPage} />
			<Route path='/nodedashboardpage/nodegridlist' component={NodeGridListPage} />
			<Route path='/nodedashboardpage/nodecontainerlist' component={NodeContainerPage} />
			
			
			</Router>
			</div>
			</MuiThemeProvider>
			</div>
			);
	}
};

ReactDOM.render(<App />,document.getElementById('container'));