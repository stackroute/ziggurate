import React,{Component} from 'react';
import ServiceReplicationCard from '../ServiceReplicationCard';

class ServiceReplicationCluster extends React.Component
{

	render(){
		let content= this.props.serviceListData.map(function(data,index){
			return(
				<ServiceReplicationCard key={index} mappedData={data}/> 
				);
		});

		return(<div className='row'>
			<div className='row center-xs'>
			{content}
			</div>
			</div>);
	};
};

export default ServiceReplicationCluster;