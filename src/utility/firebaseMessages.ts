/*eslint no-unused-vars: "off"*/
import firebase from 'config/firebase.prod';
import { FetchMessages, Message } from 'types';
const messageRef = firebase.database().ref('messages');

export const startMessageFetch = (
  dispatcher: FetchMessages,
  channelId: string,
) => {
  let messages: Message[] = [];
  messageRef.child(channelId).on('child_added', (snap) => {
    const value = snap.val();
    messages = [...messages, value];
    dispatcher(messages);
  });
};

export const sendMessage = async (message: Message, channelId: string) => {
  message.timestamp = firebase.database.ServerValue.TIMESTAMP;
  return messageRef
    .child(channelId)
    .push()
    .set(message)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
};

export const sendFileInstance = async (
  channeId: string,
  createMessage: (url?: string) => Promise<void>,
  url: string,
): Promise<boolean> => {
  return messageRef
    .child(channeId)
    .push()
    .set(createMessage(url))
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
};
