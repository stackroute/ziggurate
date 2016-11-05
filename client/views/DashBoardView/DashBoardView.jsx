import React from 'react';

import HomeAppBar from '../../components/HomeAppBar';
import DashBoard from '../../components/DashBoard';

export default class DashboardView extends React.Component {
  render() {
    return (
      <div>
        <HomeAppBar />
        <DashBoard />
      </div>
    );
  }
}
