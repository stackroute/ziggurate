import React from 'react';
import Divider from 'material-ui/Divider';
import NodeCard from '../NodeCard';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class NodesCluster extends React.Component {
	state={
		value: 'all'
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
			let badgeColor = '#D32F2F';
			if(data.status === 'ready') {
				badgeColor = '#4CAF50';
			}
			return(
				<NodeCard color={badgeColor} indexKey={index} key={data.id} cardContent={data}/>);
		});
		return(
			<div>
			<div className = 'row first-xs'>
			<SelectField autoWidth={true}
			floatingLabelText={'Filter By'}
			value={this.state.value}
			onChange={this.handleDropDownChange}>
			{menuItems}
			<MenuItem key={'all'} value={'all'} primaryText='All' />
			</SelectField>
			</div>
			<div className='row center-xs'>
			<h1>Nodes</h1>
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
