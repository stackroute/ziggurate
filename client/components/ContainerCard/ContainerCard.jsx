import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

class ContainerCard extends React.Component
{

    static get propTypes() {
        return(
        {
            color: React.PropTypes.string.isRequired,
            id: React.PropTypes.number.isRequired,
            value: React.PropTypes.object.isRequired
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
    <Paper zDepth={3} style={style} >
    <div style = {{backgroundColor: this.props.color}}>
    <h3 style = {{textAlign: 'center', margin: 0}}>{'Container ' + this.props.id}</h3>
    <Divider/>

    </div>
    <List style={{textAlign: 'left'}}>
    <ListItem
    key={this.props.value.id}
    style={{fontSize: '20px'}}
    disabled = {true}
    primaryText={<div><strong>Container ID- </strong>{this.props.value.id}</div>} />

    <ListItem
    key={this.props.value.serviceID + 'service' + this.props.id}
    style={{fontSize: '20px'}}
    disabled = {true}
    primaryText={<div><strong>Service ID- </strong>{this.props.value.serviceID}</div>} />

    <ListItem
    key={this.props.value.imageName + 'image' + this.props.id}
    style={{fontSize: '20px'}}
    disabled = {true}
    primaryText={<div><strong>Image Name- </strong>{this.props.value.imageName}</div>} />

    <ListItem
    key={this.props.value.createdAt + 'c' + this.props.id}
    style={{fontSize: '20px'}}
    disabled = {true}
    primaryText={<div><strong>Created </strong>{this.props.value.createdAt}</div>}/>

    <ListItem
    key={this.props.value.updatedAt + 'u' + this.props.id}
    style={{fontSize: '20px'}}
    disabled = {true}
    primaryText={<div><strong>Updated </strong>{this.props.value.updatedAt}</div>} />
    </List>
    </Paper>
    );
 }
}

export default ContainerCard;
