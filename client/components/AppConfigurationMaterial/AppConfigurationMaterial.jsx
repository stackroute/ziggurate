import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  domain: {
    fontWeight: 'bold',
    color: '#999'
  },
  button: {
    marginTop: '50px'
  }
};

export default class AppConfigurationMaterial extends React.Component {
  static get propTypes() {
    return {
      dnsChanged: React.PropTypes.func.isRequired
    };
  }

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Configure Application</h1>
        <TextField
          floatingLabelText="App Name"
          fullWidth={true}
          onChange={this.handleAppNameChange.bind(this)}
          value={this.state.appName}
          />
        <TextField
          floatingLabelText="Domain Name"
          onChange={this.handleDomainNameChange.bind(this)}
          value={this.state.domainName}
          />
        <span style={styles.domain}>.ziggurate.blr.stackroute.in</span>
        <div style={styles.button}>
          <RaisedButton
            label="Finish"
            primary={true}
            disabled={false}
            onClick={this.handleFinish.bind(this)}
            />
        </div>
      </div>
    );
  }

  handleAppNameChange(e) {
    this.setState({
      appName: e.target.value
    });
  }

  handleDomainNameChange(e) {
    this.setState({
      domainName: e.target.value
    });
  }

  handleFinish() {
    this.props.dnsChanged({appName: this.state.appName, domainName: this.state.domainName});
  }
}
