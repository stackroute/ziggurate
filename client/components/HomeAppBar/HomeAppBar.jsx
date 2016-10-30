import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';

class HomeAppBar extends React.Component{
	
	handleLogout() {

	}

	render(){
		return(
			<AppBar
			title="App Fabric"
			iconElementRight={<Link to='/'><IconButton><ActionExitToApp /></IconButton></Link>}
			onRightIconButtonTouchTap={this.handleLogout.bind(this)}
			/>);
	}
};

export default HomeAppBar;