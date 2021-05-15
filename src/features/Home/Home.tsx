import React from 'react';
import { Grid } from 'semantic-ui-react';
// import { useSelector } from 'react-redux';
import { ColorPanel, Messages, SidePanel, MetaPanel } from 'components';
// import { AuthState, RootReducer, FirebaseUser } from 'types';

const Home: React.FC = () => {
  // const { userData } = useSelector<RootReducer, AuthState>(
  //   (state) => state.auth,
  // );
  // const { displayName } = userData as FirebaseUser;
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
