import React from 'react';
import Divider from 'material-ui/Divider';
import AppCard from '../AppCard';


class AppList extends React.Component
{

  static get propTypes() {
    return (
    {
            appListData: React.PropTypes.array.isRequired
     });
  }

  render() {
    let appcard = this.props.appListData.map(function(value, index) {
     return(
      <AppCard value = { value } key = { index } />);
   });
    return(
      <div>
      <div className='row'>
      <img src='./images/apps.jpg'
      style={{width: '50px', height: '50px', marginTop: '14px'}} />
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
