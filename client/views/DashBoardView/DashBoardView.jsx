import React from 'react';
import $ from 'jquery';
import HomeAppBar from '../../components/HomeAppBar';
import DashBoard from '../../components/DashBoard';

export default class DashboardView extends React.Component {

  state = {
      data: {}
  };

  componentDidMount() {
		this.getData();
	}

	getData = () => {
		$.ajax({
			url: '/api/v1/dashboard/admin',
			type: 'GET',
			dataType: 'json',
			success: function(data1) {
        this.setState({data: data1});
			}.bind(this)
		});
	}

  render() {
    return (
      <div>
        <HomeAppBar />
        <DashBoard healthData={this.state.data} />
      </div>
    );
  }
}
