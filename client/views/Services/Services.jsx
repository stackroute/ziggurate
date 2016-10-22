import React,{Component} from 'react';

import $ from 'jquery';
import HomeAppBar from '../../components/HomeAppBar';
import ServiceList from '../../components/ServiceList';


class Services extends React.Component{

	state={
		serviceData:[]
	};


	getData = () => {
		$.ajax({
			url:'http://localhost:3000/service',    
			type:'GET',
			datatype:'JSON',
			success:function(data)
			{
				this.setState({serviceData : data});
			}.bind(this)	  
		});
	}

	componentDidMount = () =>{
		this.getData();
	}

	render(){
		return(<div>
			<HomeAppBar />
			<div className='container-fluid'>
			<ServiceList serviceListData={this.state.serviceData}/>
			</div>
			</div>
			);
	}
};

export default Services;