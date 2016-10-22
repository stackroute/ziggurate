import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import NodeContainerTile from '../NodeContainerTile';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
};

class NodeContainerList extends React.Component{
  render(){
    let content= this.props.serviceListData.map(function(data,index){
      return(
        <NodeContainerTile key={index} tile={data} /> );
    });
    return(

     <div  className='container-fluid'>

    <Paper zDepth={2} style={{marginTop:20,marginBottom:20,width:100,backgroundColor:'pink',textAlign:'center'}}>
     <h3>{this.props.val}</h3>
     </Paper>
     <GridList
     padding={20}
     cellHeight={200}
     style={styles.gridList} cols={2.2}>
     
     {content} 
     </GridList>
     
     <br/>
     <Divider style={{backgroundColor: 'black'}}/>
     <br />
     <br />
     
     </div>
     
     );

  };
};
export default NodeContainerList;


