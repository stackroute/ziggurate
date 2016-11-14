import React from 'react';
import {Table, TableHeader, TableBody, TableRow} from 'material-ui/Table';
import {TableHeaderColumn, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    marginTop: '50px'
  }
};

export default class ServiceConfigurationMaterial extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static get propTypes() {
    return {
      services: React.PropTypes.object.isRequired,
      valueChanged: React.PropTypes.func.isRequired
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        services: this.props.services
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Configure Services</h1>
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            edgesForCheckbox={false} >
            <TableRow>
              <TableHeaderColumn>Service Name</TableHeaderColumn>
              <TableHeaderColumn>Configuration</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={true} >
            <TableRow>
              <TableRowColumn>tasker</TableRowColumn>
              <TableRowColumn>MONGO_URL, PORT, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
        <RaisedButton
          primary={true}
          label="Next"
          style={styles.button}
          disabled={false}
          onClick={this.props.valueChanged.bind(this, this.state.services)} />
      </div>
    );
  }
}
