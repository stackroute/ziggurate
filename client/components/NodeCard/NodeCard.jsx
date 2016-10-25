import React,{Component} from 'react';
import {Card,  CardTitle,CardHeader, CardText,CardActions,CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';


class NodeCard extends React.Component{
	state = {
        color: this.props.color
    };
    render(){
        return(
            <Paper zDepth={3} style={{marginLeft:'10px',marginTop:'15px',width:'350px'}}>
            <Card expanded={true}>
            <CardHeader
            title={this.props.tile.Name}
            titleStyle={{fontSize:'24px'}}
            avatar={<Badge badgeContent={''} primary={true} badgeStyle={{background:this.state.color,right:'20px',top:'5px'}}/>}
            style={{fontWeight:'bold',background:'Grey'}}
            />
            <CardText expandable={true}>
            <List>
            <ListItem 
            key={this.props.tile.Addr}
            style={{fontSize:'20px'}} 
            primaryText={"Ip:"+this.props.tile.Ip+":"+this.props.tile.Port} />
            <ListItem 
            key={this.props.tile.Role}
            style={{fontSize:'20px'}} 
            primaryText={"Role:"+this.props.tile.Role} />
            </List>
            <Divider />
            </CardText>
            <CardActions>
            <FlatButton label="More.." secondary={true} onTouchTap={this.handleOpen} style={{marginLeft:'70%'}}/>
            </CardActions>
            </Card>
            </Paper>
            );
    }
};
export default NodeCard;
