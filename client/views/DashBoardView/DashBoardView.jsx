import React from 'react';
import $ from 'jquery';
import HomeAppBar from '../../components/HomeAppBar';
import DashBoard from '../../components/DashBoard';
import UserDashBoard from '../../components/UserDashBoard';
import jwt from 'jwt-decode';
import cookie from 'react-cookie';

const socket = io('http://localhost:8080');

function decodeToken(token) {
  let decoded = jwt(token);
  return(
    decoded.roles[0]);
}

export default class DashboardView extends React.Component {

  state = {
    data: {},
    userdata: {},
    userType: false
  };

  componentDidMount() {
    const viewType = () => {
      const token = cookie.load('token');
      if(decodeToken(token) === 'admin') {
        this.setState({userType: true});
        this.getAdminData();
      }
      else
      {
        this.setState({userType: false});
        this.getUserData();
      }
    };
    viewType();
  }

  getUserData = () => {
    let user = JSON.parse(localStorage.user);
    $.ajax({
     url: '/api/v1/userdashboard/' + user.login,
     type: 'GET',
     dataType: 'json',
     success: function(data1) {
      this.setState({userdata: data1});
    }.bind(this)
  });
  }

  getAdminData = () => {
    $.ajax({
     url: '/api/v1/dashboard/admin',
     type: 'GET',
     dataType: 'json',
     success: function(data1) {
      this.setState({data: data1});
    }.bind(this)
  });

    socket.on('admindash', (data1) => {
      this.setState({data: data1});
    });
  }

  render() {
    return (
      <div>
      <HomeAppBar />
      {
        this.state.userType ?
        <DashBoard healthData={this.state.data} /> :
        <UserDashBoard healthData={this.state.userdata} />
      }
      </div>
      );
  }
}
