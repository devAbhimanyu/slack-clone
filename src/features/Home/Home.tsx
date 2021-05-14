import { Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ColorPanel } from 'components';
import { AuthState, RootReducer } from 'types';

export default function Home() {
  const { userData } = useSelector<RootReducer, AuthState>(
    (state) => state.auth,
  );
  const { user = null } = userData;
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee' }}>
      <ColorPanel />
    </Grid>
  );
}
