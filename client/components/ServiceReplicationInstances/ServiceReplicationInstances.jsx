import React from 'react';
import Divider from 'material-ui/Divider';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Link} from 'react-router';

class ServiceReplicationInstances extends React.Component
{
	static get propTypes() {
    return (
    {
      serviceName: React.PropTypes.string.isRequired,
      appName: React.PropTypes.string
    });
  }
	render() {
		return(
			<div className='row'>
			<div className='col-xs-12 col-lg-12 col-sm-12'>
			<Link to= {'/' + this.props.appName + '/services/'}>
			<ArrowBack color='#F44336' hoverColor='#4CAF50' style={{height: '50px', width: '50px'}} />
			</Link>
			<div className='row center-xs'>
			<h2>Instances of {this.props.serviceName}</h2>
			</div>
			<br/>
			<Divider />
			</div>
			</div>
			);
	}
}
export default ServiceReplicationInstances;
