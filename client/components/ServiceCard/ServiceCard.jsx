import React from 'react';
import Avatar from 'material-ui/Avatar';
import {red300, grey400, orange200, cyan300, brown200, lightBlue300, deepOrangeA100, lightGreen400, amberA200, lime500, white000} from 'material-ui/styles/colors';
import {Link} from 'react-router';

const colour = [red300, grey400, orange200, cyan300, brown200, lightBlue300, deepOrangeA100, lightGreen400, amberA200, lime500];
let i = 0;
class ServiceCard extends React.Component
{
  render() {
    i = i + 1;
    if(i === 10) {
      i = 0;
    }
    const style = {
      height: 100,
      width: 250,
      marginLeft: 30,
      marginTop: 80,
      paddingTop: 50,
      display: 'block-inline'
    };
    return(
      <span>
      <Link to='/services/replication' style={{textDecoration: 'none'}}>
      <Avatar
      color={white000}
      backgroundColor={colour[i]}
      size={70}
      style={style}
      >
      {this.props.value.name}
      </Avatar>
      </Link>
      </span>
      );
  }
}

export default ServiceCard;
