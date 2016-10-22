import React,{Component} from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import ActionHome from 'material-ui/svg-icons/action/home';
import Divider from 'material-ui/Divider';
import ServiceCard from '../ServiceCard';


class ServiceList extends React.Component
{
  render() {
    let servicecard = this.props.serviceListData.map(function(value,index){
     return(<ServiceCard value={value} key={index} />);
   });
    return(<div>
      <div className='row'>
      <Link to='/'>
      <ActionHome color='black' hoverColor='#F44336' style={{height:'50px',width:'50px'}}/>
      </Link>
       </div>
       <div className='row center-xs'>
      <h1>AppName</h1>
      </div>
      <div className='row'>
      <div className='col-xs-offset-1 col-lg-10 col-sm-10 col-xs-10'>

      <div className='row center-xs'>

      {servicecard}
      </div>
      </div>
      </div>
      </div>
      );		
  }
}

export default ServiceList;