import React from 'react';
import $ from 'jquery';
import HomeAppBar from '../../components/HomeAppBar';
import ServiceList from '../../components/ServiceList';


class Services extends React.Component {

	state= {
		serviceData: []
	};

	getData = () => {
		$.ajax({
			url: '/api/v1/services/service',
			type: 'POST',
			data: JSON.stringify({hey: 'key'}),
			datatype: 'JSON',
			contentType: 'application/json',
			success: function(data)
			{
				this.setState({serviceData: data});
			}.bind(this)
		});
	}

	componentDidMount = () => {
		this.getData();
	}
	render() {
		return(
			<div>
			<HomeAppBar />
			<div className='container-fluid'>
			<ServiceList serviceListData={this.state.serviceData}/>
			</div>
			</div>
			);
	}
}

export default Services;
