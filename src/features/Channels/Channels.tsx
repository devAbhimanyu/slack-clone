import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import { setChannels, setActiveChannel } from './channelSlice';
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
import { setMessages } from 'features/Messages/messageSlice';

const initialNewChannelState: NewChannel = {
  channelDetails: '',
  channelName: '',
};

interface ChannelsProps {
  userData: FirebaseUser | null;
}

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

  useEffect(() => {
    startChannelSub(fetchChannels);
    return () => closeChannelSub();
  }, []);

  useEffect(() => {
    if (channels?.length && !firstLoad) {
      dispatch(setActiveChannel(channels[0]));
    }
  }, [channels, firstLoad]);

  const displayChannels = useMemo(() => {
    return channels?.length
      ? channels.map((channel) => (
          <Menu.Item
            key={channel.id}
            onClick={() => {
              dispatch(setActiveChannel(channel));
              dispatch(setMessages([]));
            }}
            name={channel.name}
            style={{ opacity: 0.7 }}
            active={channel.id === activeChannel?.id}
          >
            # {channel.name}
          </Menu.Item>
        ))
      : null;
  }, [dispatch, channels, activeChannel]);

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
      <Menu.Menu style={{ paddingBottom: '2em' }}>
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
