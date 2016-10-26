import React,{Component} from 'react';

import NodeDashBoard from '../../components/NodeDashBoard';


class NodeDashBoardPage extends React.Component{

	render(){
		return(<div className='container-fluid'>
				<NodeDashBoard/>
				</div>
			);
	}
};

export default NodeDashBoardPage;