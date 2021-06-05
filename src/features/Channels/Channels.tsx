import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  Button,
  Label,
} from 'semantic-ui-react';
import { setChannels, setActiveChannel } from './channelSlice';
import { setMessages } from 'features/Messages/messageSlice';
import { useNotifications } from 'hooks';
import { closeChannelSub, startChannelSub, addChannel } from 'utility';
import {
  ChannelState,
  FirebaseUser,
  RootReducer,
  ChannelInstance,
  NewChannel,
  InputChangeEvent,
  ClickEvent,
} from 'types';

const initialNewChannelState: NewChannel = {
  channelDetails: '',
  channelName: '',
};

interface ChannelsProps {
  userData: FirebaseUser | null;
}

const channelAttachecd: string[] = [];

const Channels: React.FC<ChannelsProps> = ({ userData }) => {
  const dispatch = useDispatch();

  const { channels, activeChannel, firstLoad } = useSelector<
    RootReducer,
    ChannelState
  >((state) => state.channel);

  const [newChannel, setNewChannel] = useState<NewChannel>(
    initialNewChannelState,
  );

  const [modal, setmodal] = useState(false);

  const fetchChannels = useCallback(
    (channelList: ChannelState['channels']) => {
      dispatch(setChannels(channelList));
    },
    [dispatch],
  );

  const [addNotificationToChannel, clearNotifications, notifications] =
    useNotifications();

  useEffect(() => {
    if (channels?.length) {
      channels.forEach((ch) => {
        const { id } = ch;
        if (!channelAttachecd.includes(id as string)) {
          channelAttachecd.push(id as string);
          addNotificationToChannel(
            id as string,
            activeChannel as ChannelInstance,
          );
          console.log('channel id ', id);
        }
      });
    } else {
      channelAttachecd.length = 0;
    }
  }, [channels]);

  useEffect(() => {
    startChannelSub(fetchChannels);
    return () => closeChannelSub();
  }, []);

  useEffect(() => {
    if (channels?.length && !firstLoad) {
      dispatch(setActiveChannel({ channel: channels[0], isPrivate: false }));
    }
  }, [channels, firstLoad]);

  const checkForNotification = (channelId?: string) => {
    let count = 0;
    notifications.forEach((notification) => {
      if (notification.id === channelId) {
        count = notification.count;
      }
    });
    if (count > 0) return count;
  };

  /**
   * rendered channel list
   */
  const displayChannels = useMemo(() => {
    return channels?.length
      ? channels.map((channel) => (
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
            {checkForNotification(channel.id) && (
              <Label color='red'>{checkForNotification(channel.id)}</Label>
            )}
            # {channel.name}
          </Menu.Item>
        ))
      : null;
  }, [dispatch, channels, activeChannel, notifications]);

  const addNewChannel: ClickEvent = async (e) => {
    e.preventDefault();
    const { channelDetails, channelName } = newChannel;
    if (channelDetails && channelName && userData) {
      const { displayName, photoURL, uid } = userData;
      const channelInfo: ChannelInstance = {
        details: channelDetails,
        name: channelName,
        createdBy: {
          avatar: photoURL as string,
          name: displayName as string,
          uid: uid as string,
        },
      };
      const success = await addChannel(channelInfo);
      if (success) {
        setNewChannel(initialNewChannelState);
        setmodal(false);
      }
    }
  };

  const changeHandler: InputChangeEvent = (e): void => {
    const { value } = e.target;
    const name = e.target.name as 'channelDetails' | 'channelName';
    const stateCopy = { ...newChannel };
    stateCopy[name] = value;
    setNewChannel(stateCopy);
  };

  return (
    <>
      <Menu.Menu className='menu'>
        <Menu.Item>
          <span>
            <Icon name='exchange' /> CHANNELS {channels?.length}{' '}
          </span>
          <Icon name='add' onClick={() => setmodal(!modal)} />
        </Menu.Item>
        {displayChannels}
      </Menu.Menu>
      {/* Add Channel Modal */}
      <Modal basic open={modal} onClose={() => setmodal(false)}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label='Name of Channel'
                name='channelName'
                onChange={changeHandler}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label='About the Channel'
                name='channelDetails'
                onChange={changeHandler}
              />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={addNewChannel} color='green' inverted>
            <Icon name='checkmark' /> Add
          </Button>
          <Button color='red' inverted onClick={() => setmodal(false)}>
            <Icon name='remove' /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
export default Channels;
