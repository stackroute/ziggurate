import React from 'react';
import {Link} from 'react-router';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ServiceCard from '../ServiceCard';


class ServiceList extends React.Component
{
  render() {
    let servicecard = this.props.serviceListData.map(function(value, index) {
     return (
      <ServiceCard value={value} key={index} />);
   });
    return (
      <div>
      <div className='row'>
      <Link to='/apps'>
      <ArrowBack color='black' hoverColor='#F44336' style={{height: '50px', width: '50px'}}/>
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
