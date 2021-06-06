import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { Channels, FavoriteChannels } from 'features/Channels';
import UserPanel from './UserPanel';
import { DirectMessages } from '..';
import { RootReducer, AuthState } from 'types';

const SidePanel: React.FC = () => {
  const { userData } = useSelector<RootReducer, AuthState>(
    (state) => state.auth,
  );
  return (
    <Menu
      size='large'
      inverted
      fixed='left'
      vertical
      style={{ background: '#4c3c4c', fontSize: '1.2rem' }}
    >
      <UserPanel />
      <FavoriteChannels />
      <Channels userData={userData} />
      <DirectMessages currUser={userData} />
    </Menu>
  );
};
export default SidePanel;
