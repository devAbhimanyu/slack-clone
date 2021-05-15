import firebase from 'config/firebase.prod';
const channelRef = firebase.database().ref('channels');
import { ChannelInstance, FetchChannel } from 'types';

export const startChannelSub = async (dispatcher: FetchChannel) => {
  let channels: ChannelInstance[] = [];
  channelRef.on('child_added', (snap) => {
    const value = snap.val() as ChannelInstance;
    channels = [...channels, value];
    dispatcher(channels);
  });
};

export const closeChannelSub = () => channelRef.off();

export const addChannel = (channel: ChannelInstance) => {
  const key = channelRef.push().key as string;
  channel.id = key;
  return channelRef
    .child(key)
    .update(channel)
    .then(() => {
      console.log('channel added');
      return true;
    })
    .catch((err) => {
      console.error(err);
    });
};
