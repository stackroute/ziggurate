import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

class DashBoard extends React.Component
{
	render() {
		return(
			<div>
			<Paper zDepth={3} style={{width: '98%', marginTop: 0}}>
			<div style={{backgroundColor: '#4CAF50'}}>
			<h1 style={{textAlign: 'center'}}>Healthy Systems</h1>
			<Divider/>
			</div>
			<div className = 'row' style={{justifyContent: 'space-around'}}>
			<div style= {{margin: '10px'}}>
			<Avatar size={180}>A</Avatar>
			<h2 style={{textAlign: 'center'}}>Nodes</h2>
			</div>
			<div style= {{margin: '10px'}}>
			<Avatar size={180}>B</Avatar>
			<h2 style={{textAlign: 'center'}}>Apps</h2>
			</div>
			<div style= {{margin: '10px'}}>
			<Avatar size={180}>C</Avatar>
			<h2 style={{textAlign: 'center'}}>Apps</h2>
			</div>
			<div style= {{margin: '10px'}}>
			<Avatar size={180}>D</Avatar>
			<h2 style={{textAlign: 'center'}}>Apps</h2>
			</div>
			</div>
			</Paper>
			<Paper zDepth={3} style={{width: '98%'}}>
			<div style={{backgroundColor: '#F44336'}}>
			<h1 style={{textAlign: 'center'}}>Unhealthy Systems</h1>
			<Divider/>
			</div>
			<div className = 'row' style={{justifyContent: 'space-around'}}>
			<div style= {{margin: '10px'}}>
			<Avatar size={180}>D</Avatar>
			<h2 style={{textAlign: 'center'}}>Apps</h2>
			</div>
			<div style= {{margin: '10px'}}>
			<Avatar size={180}>D</Avatar>
			<h2 style={{textAlign: 'center'}}>Apps</h2>
			</div>
			<div style= {{margin: '10px'}}>
			<Avatar size={180}>D</Avatar>
			<h2 style={{textAlign: 'center'}}>Apps</h2>
			</div>
			<div style= {{margin: '10px'}}>
			<Avatar size={180}>D</Avatar>
			<h2 style={{textAlign: 'center'}}>Apps</h2>
			</div>
			</div>
			</Paper>
			<Paper zDepth={3} style={{width: '98%'}}>
			<div>
			<h1 style={{textAlign: 'center'}}>Data Events</h1>
			<Divider/>
			</div>
			</Paper>
			</div>
		);
	}
}

export default DashBoard;
