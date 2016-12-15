import React from 'react';
import HomeAppBar from '../../components/HomeAppBar';
import NodesCluster from '../../components/NodesCluster';
import $ from 'jquery';

const socket = io('http://localhost:8080');
class NodesClusterPage extends React.Component {

	state= {
		data: [],
		dropdown: []
	};

	handleFilter = (filter) =>
	{
		this.getData(filter);
	};

	getData = (filter) => {
		$.ajax({
			url: '/api/v1/servers/' + filter,
			type: 'GET',
			datatype: 'json',
			success: function(data1) {
				this.setState({dropdown: data1[0].dropDown, data: data1});
			}.bind(this)
		});

		socket.on('servers', (data1) => {
			this.setState({dropdown: data1[0].dropDown, data: data1});
		});
	};


	componentDidMount = () => {
		this.getData('All-Servers');
	}

	render() {
		return(
			<div>
			<HomeAppBar />
			<div className='container-fluid'>
			<NodesCluster filter={this.handleFilter}
			serviceListData={this.state.data}
			dropdowndata={this.state.dropdown}/>
			</div>
			</div>
			);
	}
}

export default NodesClusterPage;
