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

  componentWillMount() {
    console.log('Listening on services');
    socket.on('services', (services) => {
      console.log('Received Services');
      this.setState({services: services});
    });

    socket.on('complete', () => {
      console.log('Deployed');
      this.setState({
        deployed: true
      });
    });
  }

  render() {
    const arr = [];
    arr.unshift(<SelectRepositoryMaterial setRepository={this.handleSetRepository.bind(this)}/>);

    if(this.state.selectedRepository && this.state.selectedBranch && this.state.services) {
      arr.unshift(<ServiceConfigurationMaterial
        valueChanged={this.setServices.bind(this)}
        services={this.state.services}
        />);
    }

    if(this.state.servicesConfiguration) {
      arr.unshift(<AppConfigurationMaterial dnsChanged={this.handleDnsChanged.bind(this)} />);
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
    socket.emit('clone', {
      repoName: repositoryName,
      branchName: branchName,
      userName: 'nischay30'
    });
    this.setState({selectedRepository: repositoryName, selectedBranch: branchName});
  }

  setServices(services) {
    console.log('Setting Updated Service Configuration');
    this.setState({
      servicesConfiguration: services
    });
  }

  handleDnsChanged(newData) {
    console.log('DNS Changed');
    const services = this.state.servicesConfiguration;
    services.meta = {
      appName: newData.appName,
      username: 'nischay'
    };
    console.log('deploy:', services);
    socket.emit('deploy', services);
  }
}
