import React from 'react';
import { Grid } from 'semantic-ui-react';
// import { useSelector } from 'react-redux';
import Messages from '../Messages/Messages';
import { ColorPanel, SidePanel, MetaPanel } from 'components';

const Home: React.FC = () => {
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

export default Home;
