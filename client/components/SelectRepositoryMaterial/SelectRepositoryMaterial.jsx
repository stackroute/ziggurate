import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import request from 'superagent';


export default class SelectRepositoryMaterial extends React.Component {
  constructor() {
    super();
    this.state = {
      repositories: [],
      branches: []
    };
  }
  static get propTypes() {
    return(
      {
        setRepository: React.PropTypes.func.isRequired
      });
  }
  componentDidMount() {
    request
      .get('/api/v1/repos')
      .end((err, response) => {
        if(err) { throw err; }
        this.setState({repositories: response.body});
      });
  }

  loadBranches(repo) {
    request.get('/api/v1/repo/' + repo + '/branches')
      .end((err, response) => {
        this.setState({branches: response.body});
      });
  }

  render() {
    const repositories = this.state.repositories.map((repository) => {
      return (
        <MenuItem key={repository} value={repository} label={repository} primaryText={repository} />
      );
    });

    const branches = this.state.branches.map((branch) => {
      return (
        <MenuItem key={branch} value={branch} label={branch} primaryText={branch} />
      );
    });

    return (
      <div>
        <h1>Choose a Repository and Branch to Deploy</h1>
        <SelectField
          fullWidth={true}
          floatingLabelText="Repository"
          value={this.state.selectedRepository}
          onChange={(event, target, value) => {
            this.loadBranches.apply(this, [value]);
            this.setState({selectedRepository: value, selectedBranch: null});
          }}>
          {repositories}
        </SelectField>
        <SelectField
          fullWidth={true}
          floatingLabelText="Branch"
          value={this.state.selectedBranch}
          disabled={!this.state.selectedRepository}
          onChange={(event, target, value) => {
            this.setState({selectedBranch: value});
          }}>
            {branches}
        </SelectField>
        <div
          style={{paddingTop: '50px'}}>
          <RaisedButton
            label="Next"
            primary={true}
            disabled={!this.state.selectedBranch}
            onClick={() => {
              this.props.setRepository(this.state.selectedRepository, this.state.selectedBranch);}
            } />
        </div>
      </div>
    );
  }
}
