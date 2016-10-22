import React,{Component} from 'react';

import HomeAppBar from '../../components/HomeAppBar';
import AuthenticationPage from '../../components/AuthenticationPage';

class Login extends React.Component{

       render(){
       return(<div>
           <HomeAppBar />
           <div className='container-fluid'>
           <AuthenticationPage />
           </div>
           </div>
           );
   };
};

export default Login;