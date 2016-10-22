import React,{Component} from 'react';

import NodesGridList from '../../components/NodesGridList';
import $ from 'jquery';

class NodeGridListPage extends React.Component{


	state={
		data:[]
	};

	getData = () => {
		$.ajax({
			url:'http://localhost:3000/node',
			type:'GET',
			datatype:'JSON',
			success: function(data){
				console.log(data);
				this.setState({data:data});
			}.bind(this)

		});
	}

	componentDidMount = () =>{
		this.getData();
	}

	render(){
		return(<div>
			<NodesGridList serviceListData={this.state.data}/>
			</div>
			);
	}
};

export default NodeGridListPage;