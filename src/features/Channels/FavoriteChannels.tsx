import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';
import { useFavourite, useNotifications } from 'hooks';
import { setActiveChannel } from './channelSlice';
import { setMessages } from 'features/Messages/messageSlice';
import { ChannelState, RootReducer } from 'types';

const FavoriteChannels: React.FC = () => {
  const dispatch = useDispatch();
  const { activeChannel } = useSelector<RootReducer, ChannelState>(
    (state) => state.channel,
  );

  const [, favChannels] = useFavourite();
  const [, clearNotifications] = useNotifications();
  const channels = useMemo(
    () =>
      favChannels.map((channel) => (
        <Menu.Item
          key={channel.id}
          onClick={() => {
            if (activeChannel?.id === channel.id) return;
            dispatch(setActiveChannel({ channel, isPrivate: false }));
            dispatch(setMessages([]));
            clearNotifications(channel.id as string);
          }}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.id === activeChannel?.id}
        >
          # {channel.name}
        </Menu.Item>
      )),
    [dispatch, favChannels, activeChannel],
  );
  return (
    <Menu.Menu className='menu'>
      <Menu.Item>
        <span>
          <Icon name='bookmark' /> Saved
        </span>
        ({favChannels.length})
      </Menu.Item>
      {channels}
    </Menu.Menu>
  );
};

export default FavoriteChannels;
