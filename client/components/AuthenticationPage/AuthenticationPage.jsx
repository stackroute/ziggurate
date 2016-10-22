import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

class AuthenticationPage extends React.Component{
  render(){
      return(
      <div className='row center-xs'>
       <div className='col-xs-12 col-mg-12 col-lg-12'>  
          <h3 style={{marginTop:'100px'}}>Click on the below button to login to your GitHub Account</h3>
          <img src="./components/AuthenticationPage/images.png" />
          <div className='row center-xs'>
          <Link to='/apps' style={{textDecoration:'none'}}>
          <RaisedButton label="Login with GitHub" type="submit" primary={true} />
          </Link>
          </div>
          </div>
          </div>
          );
  };
};

export default AuthenticationPage;