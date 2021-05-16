import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';
import { RootReducer, ChannelState } from 'types';
const MessageHeader: React.FC = () => {
  const { activeChannel } = useSelector<RootReducer, ChannelState>(
    (state) => state.channel,
  );
  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
        <span>
          {activeChannel?.name} Channel
          <Icon name={'star outline'} color='black' />
        </span>
        <Header.Subheader>2 Users</Header.Subheader>
      </Header>

      {/* Channel Search Input */}
      <Header floated='right'>
        <Input
          size='mini'
          icon='search'
          name='searchTerm'
          placeholder='Search Messages'
        />
      </Header>
    </Segment>
  );
};
export default MessageHeader;
