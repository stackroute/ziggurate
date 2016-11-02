import React,{Component} from 'react';
import Divider from 'material-ui/Divider';
import ContainerCard from '../ContainerCard'

class ContainerList extends React.Component
{


  render() {
    var containercard = this.props.containerListData.map(function(value,index){
     var colour='#4CAF50';
      if(value.desiredState=='shutdown')
        colour='#F44336';
     return(<ContainerCard value={value} color={colour} id={index+1} key={index}/>);
   }.bind(this));
    
    return(<div>
      <div className='row center-xs'>
      <h1 >
        Containers on {this.props.nodeName}
      </h1>
      </div>
      <Divider />

      <div className='row center-xs'>
      {containercard}
      </div>
      </div>
      );    
  }
}

export default ContainerList;