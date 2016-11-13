import React from 'react';
import cookie from 'react-cookie';
import request from 'superagent';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import HardwareDesktopWindows from 'material-ui/svg-icons/hardware/desktop-windows';
import AppIcon from 'material-ui/svg-icons/navigation/apps';
import DashBoardIcon from 'material-ui/svg-icons/action/dashboard';
import NodesIcon from 'material-ui/svg-icons/hardware/device-hub';

import jwt from 'jwt-decode';

const styles = {
  drawerAvatar: {
    textAlign: 'center'
  },
  avatar: {
    marginTop: '13px'
  }
};

function decodeToken(token) {
  let decoded = jwt(token);
  return(
    decoded.roles[0]);
}

export default class HomeAppBar extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false,
      userType: false
    };
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  componentDidMount() {
    const setUserInState = () => {
      this.setState({
        user: JSON.parse(localStorage.user)
      });
    };

    const viewType = () => {
      const token = cookie.load('token');
      if(decodeToken(token) === 'admin') {
        this.setState({userType: true
        });
      }
      else
      {
        this.setState({userType: false
        });
      }
    };

    if(!localStorage.user) {
      request
      .get('/api/v1/auth/github/me')
      .end(function(err, response) {
        if(err) { throw err; }
        localStorage.user = JSON.stringify(response.body);
        setUserInState();
        viewType();
      });
    } else {
      setUserInState();
      viewType();
    }
  }

  handleLogout() {
    delete localStorage.user;
    cookie.remove('token');
    this.context.router.push('/');
  }

  render() {
    return (
      <div>
      <AppBar
      title="Ziggurate"
      onLeftIconButtonTouchTap={() => { this.setState({drawerOpen: true}); }}
      />
      <Drawer
      open={this.state.drawerOpen}
      docked={false}
      onRequestChange={() => { this.setState({drawerOpen: false}); }}
      style={styles.drawer} >
      <div style={styles.drawerAvatar}>
      { this.state.user ?
        <Avatar src={this.state.user.avatar_url} size={230} style={styles.avatar}/> :
        null }
        </div>

        { this.state.userType ?
          <div>
          <MenuItem
          leftIcon={<DashBoardIcon />}
          onTouchTap={() => { this.context.router.push('/dashboard'); }}>
          DashBoard
          </MenuItem>
          <MenuItem
          leftIcon={<NodesIcon />}
          onTouchTap={() => { this.context.router.push('/nodesclusterpage'); }}>
          Servers
          </MenuItem>
          </div> :
          <MenuItem
          leftIcon={<DashBoardIcon />}
          onTouchTap={() => { this.context.router.push('/dashboard'); }}>
          DashBoard
          </MenuItem>
        }
        <MenuItem
        leftIcon={<HardwareDesktopWindows />}
        onTouchTap={() => { this.context.router.push('/deploy'); }}>
        Deploy
        </MenuItem>
        <MenuItem
        leftIcon={<AppIcon />}
        onTouchTap={() => { this.context.router.push('/apps'); }}>
        Deployed Apps
        </MenuItem>
        <MenuItem
        leftIcon={<ActionExitToApp />}
        onTouchTap={this.handleLogout.bind(this)}>
        Logout
        </MenuItem>
        </Drawer>
        </div>
        );
  }
}
