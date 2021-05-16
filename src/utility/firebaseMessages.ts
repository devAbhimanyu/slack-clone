import firebase from 'config/firebase.prod';
import { FetchMessages, Message } from 'types';
const channelRef = firebase.database().ref('messages');

export const startMessageFetch = (
  dispatcher: FetchMessages,
  channelId: string,
) => {
  let messages: any[] = [];
  channelRef.child(channelId).on('child_added', (snap) => {
    const value = snap.val();
    messages = [...messages, value];
    dispatcher(messages);
  });
};

export const sendMessage = async (message: Message, channelId: string) => {
  message.timestamp = firebase.database.ServerValue.TIMESTAMP;
  return channelRef
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
