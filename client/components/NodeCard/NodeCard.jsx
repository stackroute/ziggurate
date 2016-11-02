import React,{Component} from 'react';
import {Card,  CardTitle,CardHeader, CardText,CardActions,CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';

class NodeCard extends React.Component{
	state = {
        color: this.props.color
    };
    render(){
        return(
            <Paper zDepth={3} style={{marginLeft:'15px',marginTop:'10px',width:'350px'}}>
            <Card expanded={true}>
            <CardHeader
            title={this.props.cardContent.name}
            titleStyle={{fontSize:'25px'}}
            avatar={<Badge badgeContent={''} primary={true} badgeStyle={{background:this.state.color,right:'20px',top:'5px'}}/>}
            style={{fontWeight:'bold',background:'Grey'}}
            />

            <CardText expandable={true}>
            <List>
            <ListItem 
            key={this.props.cardContent.role}
            style={{fontSize:'20px'}} 
            primaryText={"Role:"+this.props.cardContent.role} />
            </List>

            <Divider />
            </CardText>
            <CardActions>
            <Link to={'/nodesclusterpage/'+this.props.cardContent.id+'/'+this.props.cardContent.name}>
            <FlatButton label="More.." secondary={true} onTouchTap={this.handleOpen} style={{marginLeft:'70%'}}/>
            </Link>
            </CardActions>

            </Card>
            </Paper>
            );
    }
};
export default NodeCard;
