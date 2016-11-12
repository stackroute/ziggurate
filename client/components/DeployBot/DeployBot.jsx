import React from 'react';

import Paper from 'material-ui/Paper';

import SelectRepositoryMaterial from '../SelectRepositoryMaterial';
import ServiceConfigurationMaterial from '../ServiceConfigurationMaterial';
import AppConfigurationMaterial from '../AppConfigurationMaterial';

import io from 'socket.io-client';

const styles = {
  paper: {
    padding: '50px',
    margin: '10px'
  }
};

const socket = io('');

export default class DeployBot extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const arr = [];
    arr.unshift(<SelectRepositoryMaterial setRepository={this.handleSetRepository.bind(this)}/>);

    if(this.state.selectedRepository && this.state.selectedBranch) {
      arr.unshift(<ServiceConfigurationMaterial />);
    }

    if(this.state.servicesConfiguration) {
      app.unshift(<AppConfigurationMaterial />);
    }

    const items = arr.map((item,index) => {
      return (
        <Paper
          key={arr.length-index}
          zDepth={2}
          style={styles.paper} >
          {item}
        </Paper>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-offset-2 col-lg-8">
            {items}
          </div>
        </div>
      </div>
    );
  }

  handleSetRepository(repositoryName, branchName) {
    console.log('cloning');
    socket.emit('clone', 'msg');
    this.setState({selectedRepository: repositoryName, selectedBranch: branchName});
  }
}
