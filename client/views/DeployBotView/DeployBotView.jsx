import React from 'react';

import HomeAppBar from '../../components/HomeAppBar';
import DeployBot from '../../components/DeployBot';

export default class DeployBotView extends React.Component {
  render() {
    return (
      <div>
        <HomeAppBar />
        <DeployBot />
      </div>
    );
  }
}
