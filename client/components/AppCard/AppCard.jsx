import React from 'react';
import Paper from 'material-ui/Paper';
import {orange200, white000, purple500, cyan500, green300} from 'material-ui/styles/colors';
import {Link} from 'react-router';

let colour = [orange200, green300, purple500, white000, cyan500];
let i = 0;

class AppCard extends React.Component
{
  static get propTypes() {
    return(
      {
       value: React.PropTypes.object.isRequired
      });
  }
  render() {
    i = i + 1;
    if(i === 7) {
      i = 0;
    }
    const style = {
     width: 300,
     margin: 50,
     fontSize: 25,
     textAlign: 'center',
     display: 'inline-block',
     backgroundColor: colour[i]
   };

   return(

    <span>
    <Link to= {'/' + this.props.value.appname + '/services'}
    style={{textDecoration: 'none', width: '100%'}}>
    <Paper zDepth={3} style={style} >
    <h3>{this.props.value.appname}</h3>
    </Paper>
    </Link>
    </span>
    );
 }
}

export default AppCard;
