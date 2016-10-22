import React,{Component} from 'react';

import $ from 'jquery';
import HomeAppBar from '../../components/HomeAppBar';
import AppList from '../../components/AppList';

class Apps extends React.Component{
	state={
		appData:[]
	};

	getData = () => {
		$.ajax({
			url:'http://localhost:3000/app',    
			type:'GET',
			datatype:'JSON',
			success:function(data)
			{
				this.setState({appData:data});
			}.bind(this)	  
		});
	}
	componentDidMount = () =>{
		this.getData();
	}

	render(){
		return(<div>
			<HomeAppBar />
			<div className='container-fluid'>
			<AppList appListData={this.state.appData}/>
			</div>
			</div>
			);
	}
};

export default Apps;