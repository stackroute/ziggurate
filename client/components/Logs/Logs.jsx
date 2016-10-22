import React,{Component} from 'react';
import TextField from 'material-ui/TextField';

class Logs extends React.Component
{
	render(){
		return(
			<TextField hintText="hii" fullWidth={true} multiLine={true} rows={2} rowsMax={4} />
			);
	};
};

export default Logs;