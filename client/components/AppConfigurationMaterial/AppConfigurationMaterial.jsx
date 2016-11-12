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
}

export default class AppConfigurationMaterial extends React.Component {
  render() {
    return (
      <div>
        <h1>Configure Application</h1>
        <TextField
          floatingLabelText="App Name"
          fullWidth={true} />
        <TextField
          floatingLabelText="Domain Name"
          />
        <span style={styles.domain}>.ziggurate.stackroute.in</span>
        <div style={styles.button}>
          <RaisedButton
            label="Finish"
            primary={true}
            disabled={true} />
        </div>
      </div>
    );
  }
}