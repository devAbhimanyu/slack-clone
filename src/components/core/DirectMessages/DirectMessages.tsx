import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, setUsers } from 'features/Messages/messageSlice';
import { setActiveChannel } from 'features/Channels/channelSlice';
import { Menu, Icon } from 'semantic-ui-react';
import {
  startUsersSub,
  presenceOnAdd,
  presenceOnRemove,
  startPresenceSub,
} from 'utility';
import { creatDMChannel } from 'utility/firebase/firebaseChannels';
import {
  RootReducer,
  MessageState,
  FirebaseUser,
  User,
  ChannelState,
} from 'types';

interface DirectMessagesProps {
  currUser: FirebaseUser | null;
}

const DirectMessages: React.FC<DirectMessagesProps> = ({ currUser }) => {
  const dispatch = useDispatch();
  const { activeUsers } = useSelector<RootReducer, MessageState>(
    (state) => state.messages,
  );
  const { activeChannel } = useSelector<RootReducer, ChannelState>(
    (state) => state.channel,
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
    if (currUser?.uid) {
      startUsersSub(fetchUsers, currUser.uid);
    }
  }, [currUser]);

  useEffect(() => {
    if (currUser?.uid && activeUsersPresent) {
      console.log(activeUsers);
      startPresenceSub(currUser.uid);
      presenceOnAdd(updateUserStatus, currUser.uid);
      presenceOnRemove(updateUserStatus, currUser.uid);
    }
  }, [currUser, activeUsersPresent]);

  const dmChangeHandler = async (user: User) => {
    if (currUser) {
      const channelId = creatDMChannel(user.uid, currUser?.uid);
      const currChannel = {
        id: channelId,
        name: user.name,
      };
      dispatch(setActiveChannel({ channel: currChannel, isPrivate: true }));
      dispatch(setMessages([]));
    }
  };

  return (
    <Menu.Menu className='menu'>
      <Menu.Item>
        <span>
          <Icon name='mail' /> DIRECT MESSAGES
        </span>
        {activeUsers.map((user) => (
          <Menu.Item
            key={user.uid}
            active={activeChannel?.id?.includes(user.uid)}
            onClick={() => dmChangeHandler(user)}
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
