import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router';

class ServiceCard extends React.Component
{

  static get propTypes() {
    return(
    {
      value: React.PropTypes.object.isRequired,
      id: React.PropTypes.number.isRequired,
      appName: React.PropTypes.string.isRequired
    });
  }

  render() {
    const style = {
     width: '100%',
     marginRight: 20,
     marginTop: 40,
     fontSize: 25,
     display: 'inline-block'
   };

   return(
     <Link
     to={'/' + this.props.appName +
     '/services/' + this.props.value.name + '/replicas'}
     style= {{ textDecoration: 'none', width: '100%'}}>

     <Paper zDepth={3} style={style} >
     <div style = {{backgroundColor: '#4CAF50'}}>
     <h2 style = {{textAlign: 'center', margin: 0}}>{this.props.value.name}</h2>
     <Divider/>

     </div>
     <List style={{textAlign: 'left'}}>
     <ListItem
     key={this.props.value.serviceId + 'service' + this.props.id}
     style={{fontSize: '22px'}}
     disabled = {true}
     primaryText={<div><strong>Service ID- </strong>{this.props.value.serviceId}</div>} />

     <ListItem
     key={this.props.value.createdAt + 'create' + this.props.id}
     style={{fontSize: '22px'}}
     disabled = {true}
     primaryText={<div><strong>Created </strong>{this.props.value.createdAt}</div>} />

     <ListItem
     key={this.props.value.updatedAt + 'update' + this.props.id}
     style={{fontSize: '22px'}}
     disabled = {true}
     primaryText={<div><strong>Updated </strong>{this.props.value.updatedAt}</div>} />

     <ListItem
     key={this.props.value.replicas + 'replica' + this.props.id}
     style={{fontSize: '22px'}}
     disabled = {true}
     primaryText={<div><strong>Running Replicas- </strong>{this.props.value.replicas}</div>} />

     <ListItem
     key={this.props.value.imageName + 'image' + this.props.id}
     style={{fontSize: '22px'}}
     disabled = {true}
     primaryText={<div><strong>Image Name- </strong>{this.props.value.imageName}</div>} />

     </List>
     </Paper>
     </Link>
     );
 }
}
export default ServiceCard;

