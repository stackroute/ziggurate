import React,{Component} from 'react';
import {Link} from 'react-router';
import ActionHome from 'material-ui/svg-icons/action/home';
import HomeAppBar from '../HomeAppBar';
import {GridList} from 'material-ui/GridList';

import NodeGridTile from '../NodeGridTile';

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},

	gridList: {
		width: '80%',
		height: '200px',
	},
};

class NodesGridList extends React.Component{
	render(){
		let content= this.props.serviceListData.map(function(data,index){
			return(
				<NodeGridTile key={index} tile={data}/> );
		});
		return(
			<div>
			<HomeAppBar />
			<div  className='container-fluid'>
			<Link to='/'>
			<ActionHome style={{width: '100px',height: '40px'}}/>
			</Link>
			
			<div className='row center-xs'>

			<GridList
			padding={30}
			cellHeight={200}
			style={styles.gridList}>
			{content}
			</GridList>
			</div>
			</div>
			</div>
);

	};
};
export default NodesGridList;
