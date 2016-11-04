import React from 'react';

import HomeAppBar from '../../components/HomeAppBar';

export default class DashboardView extends React.Component {
  render() {
    return (
      <div>
        <HomeAppBar />
        <small>This is the Dashboard View</small>
      </div>
    );
  }
}
