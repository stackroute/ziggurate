import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import {orange200,deepOrange300,pink400,white000,purple500,cyan500,green300} from 'material-ui/styles/colors';
import {Link} from 'react-router';

var colour=[orange200,deepOrange300,pink400,green300,purple500,white000,cyan500];
var i=0;

class AppCard extends React.Component
{

  render(){
    i++;
    if(i==7)
      i=0;
  const style = {
   width: 300,
   margin: 50,
   fontSize:25,
   textAlign: 'center',
   display: 'inline-block',
   backgroundColor:colour[i]
};

return(

<span>
    <Link to='/services' style={{textDecoration:'none',width:'100%'}}>

  <Paper zDepth={3} style={style} >
  <h3>{this.props.value.name}</h3>
  </Paper>
  </Link>
  </span>
  ); 
}
}

export default AppCard;
