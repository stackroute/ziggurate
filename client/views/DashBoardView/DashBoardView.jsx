import React from 'react';
import $ from 'jquery';
import HomeAppBar from '../../components/HomeAppBar';
import DashBoard from '../../components/DashBoard';
import UserDashBoard from '../../components/UserDashBoard';
import jwt from 'jwt-decode';
import cookie from 'react-cookie';

function decodeToken(token) {
  let decoded = jwt(token);
  return(
    decoded.roles[0]);
}

export default class DashboardView extends React.Component {

  state = {
    data: {},
    userType: false
  };

  componentDidMount() {
    let socket = io();
    socket.emit('nodes', 'hey');
    const viewType = () => {
      const token = cookie.load('token');
      if(decodeToken(token) === 'admin') {
        this.setState({userType: true
        });
        this.getData();
      }
      else
      {
        this.setState({userType: false
        });
      }
    };
    viewType();
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
      {
        this.state.userType ?
        <DashBoard healthData={this.state.data} /> :
        <UserDashBoard healthData={this.state.data} />
      }
      </div>
      );
  }
}
