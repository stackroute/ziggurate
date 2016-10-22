import React,{Component} from 'react';
import {GridTile} from 'material-ui/GridList';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';



class NodeGridTile extends React.Component{
	state = {
    open: false,
    expanded: false
  };

  handleOpen = () => {
  	
  	this.setState({open: true});
    
  };
  handleClose = () => {
    
    this.setState({open: false});
    
  };
  
  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  }
  render(){
    return(
     <GridTile 
     title={this.props.tile.title} 
     subtitle={<span>IP <b>{this.props.tile.author}</b></span>}
     style={{marginLeft:'30px'}}
     actionIcon={<div>
      <ActionInfoOutline 
      onTouchTap={this.handleOpen} 
      color={blue500} 
      style={{marginRight: '5px',marginTop: '10px',width: '55px',height: '30px'}} />
      <Toggle toggled={this.state.expanded} onToggle={this.handleToggle} />
      </div>}>
     <Dialog title="Info"  
     modal={true} 
     open={this.state.open}>
     <TextField floatingLabelText="No. of Services" type='number' defaultValue="24" />
     <br />
     <TextField floatingLabelText="No. of  Containers" type='number' defaultValue="24" />
     <br />
     <RaisedButton label="Close" secondary={true} onTouchTap={this.handleClose} />
     </Dialog>
     <img src="components/NodeGridTile/SystemsNode3.jpg" width="100%" height="100%" />
     </GridTile>
     );
  }
};
export default NodeGridTile;
