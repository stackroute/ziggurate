import React from 'react';
import {Link} from 'react-router';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ServiceCard from '../ServiceCard';


class ServiceList extends React.Component
{
  static get propTypes() {
    return(
    {
      serviceListData: React.PropTypes.array.isRequired
    });
  }
  render() {
    let servicecard = this.props.serviceListData.map(function(value, index) {
     return (
      <ServiceCard value={value} key={index} id={index + 1} />);
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
      <div className='row center-xs'>
      {servicecard}
      </div>
      </div>
      );
  }
}

export default ServiceList;
