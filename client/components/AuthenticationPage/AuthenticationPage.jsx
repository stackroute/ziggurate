import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import $ from 'jquery';


class AuthenticationPage extends React.Component{

  state={
    githubUrl:''
  };

  componentDidMount (){
    $.ajax({
      url:'/oauth/login',
      type:'GET',
      datatype:'JSON',
      success: function(data){
        this.setState({githubUrl:data});
      }.bind(this)

    });
  }
  render(){
    return(
      <div className='row center-xs'>
      <div className='col-xs-12 col-mg-12 col-lg-12'>  
      <h3 style={{marginTop:'100px'}}>Click on the below button to login to your GitHub Account</h3>
      <img src="./components/AuthenticationPage/images.png" />
      <div className='row center-xs'>
      <a href={this.state.githubUrl}>
      <RaisedButton label="Login with GitHub" type="submit" primary={true} />
      </a>
      </div>
      </div>
      </div>
      );
  };
};


export default AuthenticationPage;