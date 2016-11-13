import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

class UserDashBoard extends React.Component
{
   static get propTypes() {
      return(
      {
         healthData: React.PropTypes.object.isRequired
      });
   }
   render() {
      return(
         <div>
         <Paper zDepth={3} style={{width: '98%', marginTop: 0}}>
         <div>
         <h1 style={{textAlign: 'center'}}>Healthy Systems</h1>
         <Divider/>
         </div>
         <div className = 'row' style={{justifyContent: 'space-around'}}>
         <div style= {{margin: '10px'}}>
         <Avatar size={200} backgroundColor='#66BB6A'>{this.props.healthData.services}</Avatar>
         <h2 style={{textAlign: 'center'}}>Services</h2>
         </div>
         <div style= {{margin: '10px'}}>
         <Avatar size={200} backgroundColor='#66BB6A'>{this.props.healthData.apps}</Avatar>
         <h2 style={{textAlign: 'center'}}>Apps</h2>
         </div>
         </div>
         </Paper>
         <Paper zDepth={3} style={{width: '98%'}}>
         <div>
         <h1 style={{textAlign: 'center'}}>Unhealthy Systems</h1>
         <Divider/>
         </div>
         <div className = 'row' style={{justifyContent: 'space-around'}}>
         <div style= {{margin: '10px'}}>
         <Avatar size={200} backgroundColor='#BF360C'>--</Avatar>
         <h2 style={{textAlign: 'center'}}>Services</h2>
         </div>
         <div style= {{margin: '10px'}}>
         <Avatar size={200} backgroundColor='#BF360C'>--</Avatar>
         <h2 style={{textAlign: 'center'}}>Apps</h2>
         </div>
         </div>
         </Paper>
         </div>
         );
}
}

export default UserDashBoard;
