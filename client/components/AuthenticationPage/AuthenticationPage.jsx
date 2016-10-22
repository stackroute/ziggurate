import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

class AuthenticationPage extends React.Component{
   render(){
       return(
       <div className='row center-xs'>
           <Link to='/apps' style={{textDecoration:'none'}}>
           <h3>Click on the below button to login to your GitHub Account</h3>
           <RaisedButton label="Login with GitHub" type="submit" primary={true} />
           </Link>
           </div>
           );
   };
};

export default AuthenticationPage;