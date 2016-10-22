import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

class ServiceReplicationInstances extends React.Component
{
	render(){

		return(<div className='row'>
			<div className='col-xs-12 col-lg-12 col-sm-12'>
			<Link to='/services'>
			<ArrowBack color='#F44336' hoverColor='#4CAF50' style={{height:'50px',width:'50px'}} />
			</Link>
			<div className='row center-xs'>
			<h2>ServiceName</h2>
			</div>
			<div className='row'>
			<div className='col-xs-5 col-sm-8 col-md-8 col-lg-8'>
			<h3 style={{marginTop:'35px'}}>Current Instances:</h3>
			</div>
			<div className='col-xs-7 col-sm-4 col-md-4 col-lg-4' style={{marginBottom:'20px'}}>
			<form>
			<TextField floatingLabelText="Replicas required" required 
			type='number' min={1} max={20} style={{width:'80%'}}/>
			<RaisedButton label="Go" type="submit" primary={true} />
			</form>
			
			</div>
			</div>
			<br/>

			<Divider />
			</div>
			</div>
			);
	};
};

export default ServiceReplicationInstances;