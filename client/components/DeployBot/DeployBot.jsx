import React from 'react';

import Paper from 'material-ui/Paper';

import SelectRepositoryMaterial from '../SelectRepositoryMaterial';
import ServiceConfigurationMaterial from '../ServiceConfigurationMaterial';
import AppConfigurationMaterial from '../AppConfigurationMaterial';

const styles = {
  paper: {
    padding: '50px',
    margin: '10px'
  }
};

const socket = io();

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
      arr.unshift(<AppConfigurationMaterial />);
    }

    const items = arr.map((item, index) => {
      return (
        <Paper
          key={arr.length - index}
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
    socket.emit('clone', {repoName: repositoryName, branchName: branchName, userName: 'nischay30'});
    this.setState({selectedRepository: repositoryName, selectedBranch: branchName});
  }
}
