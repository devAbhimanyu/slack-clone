/*eslint no-unused-vars: "off"*/
import firebase from 'config/firebase.prod';
import { FetchMessages, Message } from 'types';
const messageRef = firebase.database().ref('messages');
const privateMessageRef = firebase.database().ref('privateMessage');

export const startMessageFetch = (
  dispatcher: FetchMessages,
  channelId: string,
  isprivate: boolean,
) => {
  const ref = isprivate ? privateMessageRef : messageRef;
  let messages: Message[] = [];
  ref.child(channelId).on('child_added', (snap) => {
    const value = snap.val();
    messages = [...messages, value];
    dispatcher(messages);
  });
};

export const sendMessage = async (
  message: Message,
  channelId: string,
  isprivate: boolean,
) => {
  message.timestamp = firebase.database.ServerValue.TIMESTAMP;
  const ref = isprivate ? privateMessageRef : messageRef;
  return ref
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
  isprivate: boolean,
): Promise<boolean> => {
  const ref = isprivate ? privateMessageRef : messageRef;
  return ref
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
