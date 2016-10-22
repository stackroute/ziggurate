import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';

class HomeAppBar extends React.Component{
	render(){
		return(
			<AppBar
			title="App Fabric"
			iconClassNameRight="muidocs-icon-navigation-expand-more"
			/>);
	}
};

export default HomeAppBar;