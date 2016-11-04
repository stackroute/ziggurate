import React from 'react';
import Divider from 'material-ui/Divider';
import ContainerCard from '../ContainerCard';

class ContainerList extends React.Component
{
  static get propTypes() {
    return(
    {
      containerListData: React.PropTypes.array.isRequired,
      nodeName: React.PropTypes.string.isRequired
    });
  }
  render() {
    let containercard = this.props.containerListData.map(function(value, index)
    {
     let colour = '#4CAF50';
      if(value.desiredState === 'shutdown') {
        colour = '#F44336';
      }
     return(
      <ContainerCard value={value} color={colour} id={index + 1} key={index}/>);
   });
    return(
      <div>
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
