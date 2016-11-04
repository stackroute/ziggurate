import React from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Badge from 'material-ui/Badge';
import {Link} from 'react-router';

class NodeCard extends React.Component {
    static get propTypes() {
        return(
        {
            color: React.PropTypes.string.isRequired,
            cardContent: React.PropTypes.object.isRequired
        });
    }
    state = {
        color: this.props.color
    };
    render() {
     return(
       <Card expanded={true} style={{marginLeft: '15px', marginTop: '20px', width: '400px'}}>
       <CardHeader
       title={this.props.cardContent.name}
       titleStyle={{fontSize: '25px'}}
       avatar={
        <Badge
        badgeContent={''}
        primary={true}
        badgeStyle={{background: this.state.color, right: '20px', top: '5px'}}/>}
        style={{fontWeight: 'bold', background: '#9EA3B0'}}
        />
        <CardText expandable={true} style={{textAlign: 'left'}}>
        <List>
        <ListItem
        key={this.props.cardContent.role}
        style={{fontSize: '20px'}}
        disabled = {true}
        primaryText={'Role:' + this.props.cardContent.role} />
        <ListItem
        key={this.props.cardContent.createdAt}
        style={{fontSize: '20px'}}
        disabled = {true}
        primaryText={'CreatedAt:' + this.props.cardContent.createdAt} />
        <ListItem
        key={this.props.cardContent.updatedAt + '' + this.props.cardContent.role}
        style={{fontSize: '20px'}}
        disabled = {true}
        primaryText={'UpdatedAt:' + this.props.cardContent.updatedAt} />
        </List>
        <Divider />
        </CardText>
        <CardActions>
        <Link
        to={'/nodesclusterpage/' + this.props.cardContent.id + '/' + this.props.cardContent.name}>
        <FlatButton label='More..'
        secondary={true}
        onTouchTap={this.handleOpen}
        style={{marginLeft: '70%'}}/>
        </Link>
        </CardActions>
        </Card>
        );
 }
}
export default NodeCard;
