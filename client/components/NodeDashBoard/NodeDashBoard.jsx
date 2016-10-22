import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Link} from 'react-router';

class NodeDashBoard extends React.Component
{
 render(){
    return(<div className='row'>
        
         <div className='col-xs-12'>
        
        <div className='row'>
        <img src="/components/NodeDashBoard/nodedashboard.png" style={{width:'50px', height:'50px',marginTop: '14px',marginLeft: '10px'}} />
        <h2 style={{fontStyle: 'Roboto'}}>Node Dashboard</h2>
        </div>
        <div className='row center-xs'>
        <Paper  style={{height: '200px', width:480,marginTop:150,background:"#E1F5FE"}} zDepth={1} ><h3 style={{padding: '18px',fontStyle: 'Roboto'}}><ActionInfo style={{marginLeft: '30px'}}/>A node is an individual Linux host used to deploy and run your applications.A node cluster is a collection of nodes in the same provider and region of the same type.</h3>
        </Paper>
        </div>
        <div className='row center-xs'>
        <Link to='/nodedashboardpage/nodecontainerlist'>
        <RaisedButton backgroundColor="#a4c639" label="Bring your own node" style={{marginTop: '10px',fontStyle: 'Roboto'}} icon={<ContentAdd />} />
        </Link><br />
        </div>
        </div>
        </div>
        
        );    
};
};

export default NodeDashBoard;