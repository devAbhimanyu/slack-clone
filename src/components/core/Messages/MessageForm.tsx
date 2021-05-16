import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Segment, Button, Input } from 'semantic-ui-react';
import { sendMessage } from 'utility';

import {
  InputChangeEvent,
  Message,
  RootReducer,
  ChannelState,
  AuthState,
} from 'types';

const MessageForm: React.FC = () => {
  const { activeChannel } = useSelector<RootReducer, ChannelState>(
    (state) => state.channel,
  );
  const { userData } = useSelector<RootReducer, AuthState>(
    (state) => state.auth,
  );

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const changeHandler: InputChangeEvent = (e) => {
    const { value } = e.target;
    setMessage(value);
    if (error) setError(true);
  };

  const createMessage = async () => {
    if (activeChannel?.id && userData && message) {
      setLoading(true);
      const messageInstance: Message = {
        user: {
          avatar: userData.photoURL as string,
          uid: userData.uid,
          name: userData.displayName as string,
        },
        content: message,
      };
      const success = await sendMessage(messageInstance, activeChannel.id);
      if (success) {
        setMessage('');
      } else {
        setError(true);
      }
      setLoading(false);
    }
  };

  return (
    <Segment className='message__form'>
      <Input
        fluid
        name='message'
        onChange={changeHandler}
        value={message}
        style={{ marginBottom: '0.7em' }}
        label={<Button icon={'add'} />}
        labelPosition='left'
        className={error ? 'error' : ''}
        placeholder='Write your message'
      />
      <Button.Group icon widths='2'>
        <Button
          onClick={createMessage}
          disabled={loading}
          color='orange'
          content='Add Reply'
          labelPosition='left'
          icon='edit'
        />
        <Button
          color='teal'
          content='Upload Media'
          labelPosition='right'
          icon='cloud upload'
        />
      </Button.Group>
    </Segment>
  );
};
export default MessageForm;
