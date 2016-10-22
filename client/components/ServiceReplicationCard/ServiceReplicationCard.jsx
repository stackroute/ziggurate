import React,{Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import {Card, CardHeader, CardText,CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import Logs from '../Logs';

class ServiceReplicationCard extends React.Component
{
 state= {open:false,};

 handleClose = () => {
   this.setState({open:false,expanded:false});
 };

 handleOpen = () => {
   this.setState({open:true});
 };


 render(){
  const actions=[
  <RaisedButton label="close" secondary={true} onTouchTap={this.handleClose} />
  ];

  return(
    <div>
    <Card expanded={true} style={{marginLeft:'10px',marginTop:'15px',width:'300px'}}>
    <CardHeader
    title={this.props.mappedData.name}
    titleStyle={{fontSize:'24px'}}
    avatar={<Badge badgeContent={''} primary={true} badgeStyle={{background:'#4CAF50',right:'10px'}}/>}
    style={{fontWeight:'bold',background:'lightGrey'}}
    />
    <CardText expandable={true}>
    <List>
    <ListItem key={this.props.mappedData.ip} primaryText={"Ip:"+this.props.mappedData.ip} />
    </List>
    <Divider />
    </CardText>
    <CardActions>
    <FlatButton label="Logs" secondary={true} onTouchTap={this.handleOpen} style={{marginLeft:'70%'}}/>
    </CardActions>
    </Card>

    <Dialog title="Logs" 
    actions={actions} 
    modal={false} 
    open={this.state.open} 
    onRequestClose={this.handleClose} >
    <Logs />
    </Dialog>
    </div>
    );
};
};

export default ServiceReplicationCard;