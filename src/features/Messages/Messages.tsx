import React, { useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Comment } from 'semantic-ui-react';
import { MessageForm, MessageHeader, Message } from 'components';
import { setMessages } from './messageSlice';
import { startMessageFetch } from 'utility';
import {
  RootReducer,
  MessageState,
  AuthState,
  ChannelState,
  FetchMessages,
} from 'types';

const Messages: React.FC = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector<RootReducer, AuthState>(
    (state) => state.auth,
  );
  const { loaded, messages } = useSelector<RootReducer, MessageState>(
    (state) => state.messages,
  );
  const { activeChannel } = useSelector<RootReducer, ChannelState>(
    (state) => state.channel,
  );

  const fetchMessages: FetchMessages = useCallback(
    (meesageList: MessageState['messages']) => {
      dispatch(setMessages(meesageList));
    },
    [dispatch],
  );

  useEffect(() => {
    if (activeChannel)
      startMessageFetch(fetchMessages, activeChannel.id as string);
  }, [activeChannel]);

  const messageList = useMemo(() => {
    return loaded && userData
      ? messages.map((m) => (
          <Message
            key={m.timestamp as string}
            currUser={userData}
            message={m}
          />
        ))
      : null;
  }, [dispatch, userData, messages, loaded]);

  return (
    <>
      <MessageHeader />

      <Segment>
        <Comment.Group className='messages'>{messageList}</Comment.Group>
      </Segment>

      <MessageForm />
    </>
  );
};
export default Messages;
