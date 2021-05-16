import React from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';
import { Message as MessageType, FirebaseUser } from 'types';

interface MessageProps {
  message: MessageType;
  currUser: FirebaseUser;
}

const isOwnMessage = (message: MessageType, user: FirebaseUser) => {
  return message.user.uid === user.uid ? 'message__self' : '';
};

const timeFromNow = (timestamp: any) => moment(timestamp).fromNow();

const Message: React.FC<MessageProps> = ({ message, currUser }) => {
  const { timestamp, content, user } = message;
  return (
    <Comment>
      <Comment.Avatar src={user.avatar} />
      <Comment.Content className={isOwnMessage(message, currUser)}>
        <Comment.Author as='a'>{user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(timestamp)}</Comment.Metadata>
        <Comment.Text>{content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
