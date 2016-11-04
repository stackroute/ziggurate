import React from 'react';
import HomeAppBar from '../../components/HomeAppBar';
import NodesCluster from '../../components/NodesCluster';
import $ from 'jquery';

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
			url: '/api/v1/nodes/' + filter,
			type: 'GET',
			datatype: 'json',
			success: function(data) {
				this.setState({dropdown: data[0].dropDown});
				this.setState({data: data});
			}.bind(this)
		});
	}
	componentDidMount = () => {
		this.getData('all');
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
