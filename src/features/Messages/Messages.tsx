import React, { useMemo, useCallback, useEffect, useState } from 'react';
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
  Message as MessageM,
} from 'types';

const Messages: React.FC = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector<RootReducer, AuthState>(
    (state) => state.auth,
  );
  const { loaded, messages } = useSelector<RootReducer, MessageState>(
    (state) => state.messages,
  );
  const { activeChannel, privateChannel } = useSelector<
    RootReducer,
    ChannelState
  >((state) => state.channel);

  const [filterList, setFilterList] = useState<MessageM[]>([]);
  const fetchMessages: FetchMessages = useCallback(
    (meesageList: MessageState['messages']) => {
      dispatch(setMessages(meesageList));
    },
    [dispatch],
  );

  useEffect(() => {
    if (activeChannel?.id) {
      console.log(activeChannel?.id);
      startMessageFetch(
        fetchMessages,
        activeChannel.id as string,
        privateChannel,
      );
    }
  }, [activeChannel]);

  const handleSearchMessages = (searchTerm: string) => {
    const channelMessages = [...messages];
    const regex = new RegExp(searchTerm, 'gi');
    const searchResults = channelMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, [] as MessageM[]);
    setFilterList(searchResults);
  };

  const messageList = useMemo(() => {
    const list = filterList.length ? filterList : messages;
    return loaded && userData
      ? list.map((m) => (
          <Message
            key={m.timestamp as string}
            currUser={userData}
            message={m}
          />
        ))
      : null;
  }, [dispatch, userData, messages, filterList, loaded]);

  return (
    <>
      <MessageHeader
        messages={messages}
        searchCallback={handleSearchMessages}
      />

      <Segment>
        <Comment.Group className='messages'>{messageList}</Comment.Group>
      </Segment>

      <MessageForm />
    </>
  );
};
export default Messages;
