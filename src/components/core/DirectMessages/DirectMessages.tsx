import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from 'features/Messages/messageSlice';
import { Menu, Icon } from 'semantic-ui-react';
import { RootReducer, MessageState, FirebaseUser, User } from 'types';
import {
  startUsersSub,
  presenceOnAdd,
  presenceOnRemove,
  startPresenceSub,
} from 'utility/firebasePresence';

interface DirectMessagesProps {
  userData: FirebaseUser | null;
}

const DirectMessages: React.FC<DirectMessagesProps> = ({ userData }) => {
  const dispatch = useDispatch();
  const { activeUsers } = useSelector<RootReducer, MessageState>(
    (state) => state.messages,
  );

  const activeUsersPresent = useMemo(() => {
    return activeUsers.length ? true : false;
  }, [activeUsers]);

  const fetchUsers = useCallback(
    (userList: User[]) => {
      dispatch(setUsers(userList));
    },
    [dispatch],
  );

  const updateUserStatus = (uid: string, online: boolean) => {
    console.log(uid, online);
    const updatedUsers = activeUsers.reduce((acc, user) => {
      if (user.uid === uid) {
        const status = online ? 'online' : 'offline';
        const updatedUser: User = { ...user, status };
        return [...acc, updatedUser];
      }
      return [...acc, user];
    }, [] as User[]);
    dispatch(setUsers(updatedUsers));
  };

  useEffect(() => {
    if (userData?.uid) {
      startUsersSub(fetchUsers, userData.uid);
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.uid && activeUsersPresent) {
      console.log(activeUsers);
      startPresenceSub(userData.uid);
      presenceOnAdd(updateUserStatus, userData.uid);
      presenceOnRemove(updateUserStatus, userData.uid);
    }
  }, [userData, activeUsersPresent]);

  return (
    <Menu.Menu className='menu'>
      <Menu.Item>
        <span>
          <Icon name='mail' /> DIRECT MESSAGES
        </span>{' '}
        {activeUsers.map((user) => (
          <Menu.Item
            key={user.uid}
            style={{ opacity: 0.7, fontStyle: 'italic' }}
          >
            <Icon
              name='circle'
              color={user.status === 'online' ? 'green' : 'red'}
            />
            @ {user.name}
          </Menu.Item>
        ))}
      </Menu.Item>
    </Menu.Menu>
  );
};

export default DirectMessages;
