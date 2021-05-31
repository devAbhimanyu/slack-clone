import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';
import {
  RootReducer,
  ChannelState,
  ChangeEvent,
  Message,
  StringToVoidFunc,
} from 'types';

interface MessageHeaderProps {
  messages: Message[];
  searchCallback: StringToVoidFunc;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({
  messages,
  searchCallback,
}) => {
  const { activeChannel, privateChannel } = useSelector<
    RootReducer,
    ChannelState
  >((state) => state.channel);

  const [search, setsSearch] = useState('');
  const [searchLoading, setsSearchLoading] = useState(false);

  const countUniqueUsers = useMemo(() => {
    const uniqueUsers = messages.reduce((acc, message) => {
      const { name } = message.user;
      if (!acc.includes(name)) {
        acc.push(name);
      }
      return acc;
    }, [] as string[]);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? 's' : ''}`;
    return numUniqueUsers;
  }, [messages]);

  const channelName = useMemo(() => {
    return `${privateChannel ? '@' : '#'}${activeChannel?.name} 
    ${privateChannel ? '' : 'Channels'} `;
  }, [activeChannel, privateChannel]);

  const searchHandler: ChangeEvent = (e) => {
    const { value } = e.target;
    setsSearch(value);
    setsSearchLoading(true);
    setTimeout(() => setsSearchLoading(false), 1000);
    searchCallback(value);
  };

  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
        <span>
          {channelName}
          {!privateChannel && <Icon name={'star outline'} color='black' />}
        </span>
        <Header.Subheader>{countUniqueUsers}</Header.Subheader>
      </Header>

      {/* Channel Search Input */}
      <Header floated='right'>
        <Input
          size='mini'
          icon='search'
          name='searchTerm'
          placeholder='Search Messages'
          value={search}
          onChange={searchHandler}
          loading={searchLoading}
        />
      </Header>
    </Segment>
  );
};
export default MessageHeader;
