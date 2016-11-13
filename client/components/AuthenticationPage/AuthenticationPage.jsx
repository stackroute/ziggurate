import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';

class AuthenticationPage extends React.Component {

  state= {
    githubUrl: ''
  };

  componentDidMount () {
    $.ajax({
      url: '/api/v1/auth/github/login',
      type: 'GET',
      datatype: 'JSON',
      success: function(data) {
        this.setState({githubUrl: data});
      }.bind(this)

    });
  }
  render() {
    return(
      <div className='row center-xs'>
      <div className='col-xs-12 col-mg-12 col-lg-12'>
      <img src="./images/ziggurate.jpg" />
      <div className='row center-xs'>
      <a href={this.state.githubUrl}>
      <RaisedButton
      labelStyle= {{fontSize: '98px'}}
      style={{height: '100%', width: '100%'}}
      label="Login with GitHub" type="submit" primary={true} />
      </a>
      </div>
      </div>
      </div>
      );
  }
}

export default AuthenticationPage;
