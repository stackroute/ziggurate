import React,{Component} from 'react';
import Divider from 'material-ui/Divider';
import ContainerCard from '../ContainerCard'

class ContainerList extends React.Component
{
  render() {
    var containercard = this.props.containerListData.map(function(value,index){
     return(<ContainerCard value={value} id={index+1} key={index}/>);
   });
    
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