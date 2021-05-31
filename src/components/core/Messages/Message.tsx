import React from 'react';
import moment from 'moment';
import { Comment, Image } from 'semantic-ui-react';
import { Message as MessageType, FirebaseUser } from 'types';

interface MessageProps {
  message: MessageType;
  currUser: FirebaseUser;
}

const isOwnMessage = (message: MessageType, user: FirebaseUser) => {
  return message.user.uid === user.uid ? 'message__self' : '';
};

const timeFromNow = (timestamp: Date) => moment(timestamp).fromNow();

const Message: React.FC<MessageProps> = ({ message, currUser }) => {
  const { timestamp, content, user, image = null } = message;
  return (
    <Comment>
      <Comment.Avatar src={user.avatar} />
      <Comment.Content className={isOwnMessage(message, currUser)}>
        <Comment.Author as='a'>{user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(timestamp as Date)}</Comment.Metadata>
        {image ? (
          <Image src={image} className='message__image' />
        ) : (
          <Comment.Text>{content}</Comment.Text>
        )}
      </Comment.Content>
    </Comment>
  );
};

export default Message;
