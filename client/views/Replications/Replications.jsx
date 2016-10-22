import React,{Component} from 'react';
import ServiceReplicationCluster from '../../components/ServiceReplicationCluster';
import ServiceReplicationInstances from '../../components/ServiceReplicationInstances';
import HomeAppBar from '../../components/HomeAppBar';
import $ from 'jquery';

class Replications extends React.Component{

	state={
		data:[]
	};

  getData = () => {
    $.ajax({
      url:'http://localhost:3000/replica',
      type:'GET',
      datatype:'JSON',
      success: function(data){
        this.setState({data:data});
      }.bind(this)

    });
  }

  componentDidMount = () =>{
  	this.getData();
  }
 	render(){
		return(
				<div >
				<HomeAppBar />
        <div className='container-fluid'>
				<ServiceReplicationInstances />
				<ServiceReplicationCluster serviceListData={this.state.data}/>
        </div>
        </div>
			);
	}
};

export default Replications;