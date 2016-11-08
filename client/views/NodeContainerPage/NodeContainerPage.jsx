import React from 'react';
import HomeAppBar from '../../components/HomeAppBar';
import ContainerList from '../../components/ContainerList';
import {Link} from 'react-router';
import ActionHome from 'material-ui/svg-icons/action/home';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import $ from 'jquery';

class NodeContainerPage extends React.Component {

	static get propTypes() {
		return(
		{
			params: React.PropTypes.object.isRequired
		});
	}

	state= {
		data: [],
		open: false
	};

	getData = (filter) => {
		$.ajax({
			url: '/api/v1/containers/node/' + filter,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			success: function(data) {
				for(let key in data)
				{
					if(key === 'state') {
						this.setState({open: true});
					}
					else {
						this.setState({data: data});
					}
				}
			}.bind(this)
		});
	}
	handleClose =() => {
		this.setState({open: false});
	}
	componentDidMount = () => {
		this.getData(this.props.params.nodeId);
	}

	render() {
		const actions = [
		<Link to='/nodesclusterpage'>
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
			<div className='row end-xs'>
			<Link to='/nodesclusterpage'>
			<ActionHome style={{width: '100px', height: '50px'}}/>
			</Link>
			</div>
			<ContainerList
			nodeName={this.props.params.nodeName}
			nodePage={true}
			containerListData={this.state.data}/>
			<Dialog
			title={'Containers on ' + this.props.params.nodeName}
			actions={actions}
			modal={false}
			open={this.state.open}>
			There are no containers running on this node
			</Dialog>
			</div>
			</div>
			);
	}
}
export default NodeContainerPage;
