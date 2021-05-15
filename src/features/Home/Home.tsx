import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ColorPanel, Messages, SidePanel, MetaPanel } from 'components';
import { AuthState, RootReducer } from 'types';

const Home: React.FC = () => {
  const { userData } = useSelector<RootReducer, AuthState>(
    (state) => state.auth,
  );
  const { user = null } = userData;
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel />
      <Messages />
      <MetaPanel />
    </Grid>
  );
};

export default Home;
