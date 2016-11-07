import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
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
      <Link
      to={'/nodesclusterpage/' + this.props.cardContent.id + '/' + this.props.cardContent.name}
      style= {{ textDecoration: 'none'}}>
      <Card
      expanded={true}
      style={{marginLeft: '30px', marginRight: '20px', marginTop: '40px', width: '380px'}}>
      <CardHeader
      title={this.props.cardContent.name}
      titleStyle={{fontSize: '25px'}}
      style={{fontWeight: 'bold', background: this.props.color}}
        />
        <CardText expandable={true} style={{textAlign: 'left'}}>
        <List>
        <ListItem
        key={this.props.cardContent.role}
        style={{fontSize: '20px'}}
        disabled = {true}
        primaryText={this.props.cardContent.role} />
        <ListItem
        key={this.props.cardContent.createdAt}
        style={{fontSize: '20px'}}
        disabled = {true}
        primaryText={'Created ' + this.props.cardContent.createdAt} />
        <ListItem
        key={this.props.cardContent.updatedAt + '' + this.props.cardContent.role}
        style={{fontSize: '20px'}}
        disabled = {true}
        primaryText={'Updated ' + this.props.cardContent.updatedAt} />
        </List>
        </CardText>
        </Card>
        </Link>
        );
 }
}
export default NodeCard;
