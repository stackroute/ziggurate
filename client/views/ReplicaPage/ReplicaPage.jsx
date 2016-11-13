import React from 'react';
import ContainerList from '../../components/ContainerList';
import ServiceReplicationInstances from '../../components/ServiceReplicationInstances';
import HomeAppBar from '../../components/HomeAppBar';
import $ from 'jquery';

class ReplicaPage extends React.Component {

  static get propTypes() {
    return (
    {
      params: React.PropTypes.object.isRequired
    });
  }
	state={
		data: []
	};

  getData = () => {
    $.ajax({
      url: '/api/v1/containers/replicas/' + this.props.params.serviceName,
      type: 'GET',
      datatype: 'JSON',
      success: function(data) {
        this.setState({data: data});
      }.bind(this)

    });
  }
 componentDidMount = () => {
   this.getData();
  }

 render() {
  return(
				<div >
				<HomeAppBar />
        <div className='container-fluid'>
				<ServiceReplicationInstances
        serviceName={this.props.params.serviceName}
        appName={this.props.params.appname}
        />
				<ContainerList
        nodePage={false}
        containerListData={this.state.data}/>
        </div>
        </div>
			);
	}
}

export default ReplicaPage;
