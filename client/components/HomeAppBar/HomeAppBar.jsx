import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';

class HomeAppBar extends React.Component{
	

	render(){
		return(
			<AppBar
			title="Ziggurate"
			iconElementLeft={<IconButton />}
			iconElementRight={<Link to='/'><ActionExitToApp  style={{width:'60px',height:'40px'}}/></Link>}
			/>);
	}
};

export default HomeAppBar;