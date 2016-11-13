import React from 'react';
import $ from 'jquery';
import HomeAppBar from '../../components/HomeAppBar';
import AppList from '../../components/AppList';
import {Link} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Apps extends React.Component {
	state= {
		appData: [],
		open: false
	};
	getData = () => {
		let user = JSON.parse(localStorage.user);
		$.ajax({
			url: '/api/v1/apps/app/' + user.login,
			type: 'GET',
			datatype: 'JSON',
			success: function(data)
			{
				if(data.length === 0) {
					this.setState({open: true});
				}
				else
				{
					this.setState({appData: data[0].apps});
				}
			}.bind(this)
		});
	}

	handleClose =() => {
		this.setState({open: false});
	}

	componentDidMount = () => {
		this.getData();
	}

	render() {
		const actions = [
		<Link to='/dashboard'>
		<FlatButton
		label='Ok'
		primary={true}
		onTouchTap={this.handleClose}
		/></Link>
		];

		return(
			<div>
			<HomeAppBar />
			<div className='container-fluid'>
			<AppList appListData={this.state.appData}/>
			<Dialog
			title={'Deployment'}
			actions={actions}
			modal={false}
			open={this.state.open}>
			You have not deployed any Apps
			</Dialog>
			</div>
			</div>
			);
	}
}
export default Apps;
