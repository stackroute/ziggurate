import React from 'react';
import Divider from 'material-ui/Divider';
import NodeCard from '../NodeCard';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class NodesCluster extends React.Component {
	static get propTypes() {
		return(
		{
			filter: React.PropTypes.func.isRequired,
			dropdowndata: React.PropTypes.array.isRequired,
			serviceListData: React.PropTypes.array.isRequired
			});
	}


	state={
		value: 'All-Servers'
	};

	handleDropDownChange = (event, index, value) => {
		this.setState({value: value});
		this.props.filter(value);
	};
	render() {
		let menuItems = this.props.dropdowndata.map(function(data, index)
		{
			return(
				<MenuItem key={index} value={data} primaryText = {data} />);
		});

		let nodeCard = this.props.serviceListData.map(function(data, index) {
			let badgeColor = '#757575';
			if(data.status === 'ready') {
				badgeColor = '#4CAF50';
			}
			return(
				<NodeCard color={badgeColor} indexKey={index} key={data.id} cardContent={data}/>);
		});
		return(
			<div>
			<div className = 'row end-xs'>
			<SelectField
			floatingLabelText={'Filter By'}
			floatingLabelStyle={{fontSize: '22px', marginLeft: '-200px'}}
			floatingLabelFixed={true}
			value={this.state.value}
			style={{ fontSize: '30px', width: '300px'}}
			onChange={this.handleDropDownChange}>
			{menuItems}
			<MenuItem key={'All-Servers'} value={'All-Servers'} primaryText='All Servers' />
			</SelectField>
			</div>
			<div className='row center-xs'>
			<h1>{this.state.value}</h1>
			</div>
			<Divider />
			<div className='row center-xs'>
			{nodeCard}
			</div>
			</div>
			);
	}
}
export default NodesCluster;
