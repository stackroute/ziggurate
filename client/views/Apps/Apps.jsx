import React from 'react';
// import $ from 'jquery';
import HomeAppBar from '../../components/HomeAppBar';
import AppList from '../../components/AppList';

class Apps extends React.Component {
	state= {
		appData: []
	};
/*	getData = () => {
	let user = JSON.parse(localStorage.user);
		$.ajax({
			url: '/api/v1/apps/' + user.login,
			type: 'GET',
			datatype: 'JSON',
			success: function(data)
			{
				this.setState({appData: data});
			}.bind(this)
		});
	}*/
	componentDidMount = () => {
		// this.getData();
	}

	render() {
		return(
			<div>
			<HomeAppBar />
			<div className='container-fluid'>
			<AppList appListData={this.state.appData}/>
			</div>
			</div>
			);
	}
}
export default Apps;
