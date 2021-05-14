import firebase from 'config/firebase.prod';
const channelRef = firebase.database().ref('channels');

export const addListeners = async () => {
  let loadedChannels: any = [];
  const newList = await channelRef.on('child_added', (snap) => {
    return loadedChannels.push(snap.val());
  });
  return newList;
};
