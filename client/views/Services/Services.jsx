import React from 'react';
import $ from 'jquery';
import HomeAppBar from '../../components/HomeAppBar';
import ServiceList from '../../components/ServiceList';


class Services extends React.Component {

	state= {
		serviceData: []
	};

	static get propTypes () {
		return(
		{
				params: React.PropTypes.object.isRequired
		});
	}
	getData = () => {
		$.ajax({
			url: '/api/v1/services/' + this.props.params.appname,
			type: 'GET',
			datatype: 'JSON',
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
			<ServiceList serviceListData={this.state.serviceData}
			appName={this.props.params.appname}/>
			</div>
			</div>
			);
	}
}

export default Services;
