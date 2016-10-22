
import React,{Component} from 'react';
import {GridTile} from 'material-ui/GridList';
class NodeContainerTile extends React.Component{
 render(){
   return(
       <GridTile 
    title={this.props.tile.title} 
    style={{width:'120px'}}
    subtitle={<span>IP <b>{this.props.tile.author}</b></span>}>
    <img src="components/NodeContainerTile/SystemsNode3.jpg" width="100%" height="100%" />
    </GridTile>
   );
 }
};
export default NodeContainerTile;