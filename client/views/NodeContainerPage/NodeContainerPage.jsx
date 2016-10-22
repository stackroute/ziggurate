import React,{Component} from 'react';
import HomeAppBar from '../../components/HomeAppBar';
import NodeContainerList from '../../components/NodeContainerList';
import {Link} from 'react-router';
import ActionHome from 'material-ui/svg-icons/action/home';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';

class NodeContainerPage extends React.Component{


	state={
		data:{},
		value:1
	};

	handleChange = (event, index, value) => this.setState({value});

	getData = () => {
		$.ajax({
			url:'http://localhost:3000/nodes',
			type:'GET',
			datatype:'JSON',
			success: function(data){
				this.setState({data:data[0]});
			}.bind(this)

		});
	}

	componentDidMount = () =>{
		this.getData();
	}

	render(){
		var list=[];
		for(var i in this.state.data)
			list.push(<NodeContainerList val={i} serviceListData={this.state.data[i]} />);
			return(<div>
			<HomeAppBar />
			<Link to='/'>
			<ActionHome style={{width: '100px',height: '40px'}}/>
			</Link>
			<div className='row center-xs'>
			<SelectField value={this.state.value} onChange={this.handleChange}>
         	 <MenuItem value={1} primaryText="Filter By" />
	         <MenuItem value={2} primaryText="Apps" />
	         <MenuItem value={3} primaryText="All" />
	        </SelectField>
	        </div>
			{list}
			</div>
			);
	}
};

export default NodeContainerPage;