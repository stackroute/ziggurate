import React,{Component} from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import Divider from 'material-ui/Divider';
import AppCard from '../AppCard';


class AppList extends React.Component
{
  render() {
    let appcard = this.props.appListData.map(function(value,index){
     return(<AppCard value={value} key={index} />);
   });
    return(<div>
      <div className='row'>
      <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRNAKayx28PcYj8dTzqF4jo48tQ5zXomWXF93CQWbVsGNBmtdSE9A" style={{width:'50px',height:'50px',marginTop:'14px'}} />
      <h2 >
      App DashBoard
      </h2>
      <Divider />
      </div>
      <div className='row center-xs'>
      {appcard}
      </div>
      </div>
      );		
  }
}

export default AppList;