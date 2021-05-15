import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from 'features/Auth';
import { Dropdown, Grid, Header, Image, Icon } from 'semantic-ui-react';

import { AuthState, RootReducer } from 'types';

const UserPanel: React.FC = () => {
  const { userData } = useSelector<RootReducer, AuthState>(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const dropdownOptions = useMemo(() => {
    if (userData)
      return [
        {
          key: 'user',
          text: (
            <span>
              Signed in as <strong>{userData.displayName}</strong>
            </span>
          ),
          disabled: true,
        },
        {
          key: 'avatar',
          text: <span>Change Avatar</span>,
        },
        {
          key: 'signout',
          text: <span onClick={logout}>Sign Out</span>,
        },
      ];
    return [];
  }, [userData]);

  return (
    <Grid style={{ background: 'inherit' }}>
      <Grid.Column>
        <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
          {/* App Header */}
          <Header inverted floated='left' as='h2'>
            <Icon name='address card' />
            <Header.Content>Slack-Clone 101</Header.Content>
          </Header>

          {/* User Dropdown  */}
          <Header style={{ padding: '0.25em' }} as='h4' inverted>
            <Dropdown
              trigger={
                <span>
                  <Image src={userData?.photoURL} spaced='right' avatar />
                  {userData?.displayName}
                </span>
              }
              options={dropdownOptions}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};
export default UserPanel;
