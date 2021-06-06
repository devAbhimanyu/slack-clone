import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'config/firebase';
import { RootReducer, AuthState, ChannelInstance, UseFavourite } from 'types';
const usersRef = firebase.database().ref('users');

const useFavourite = (): UseFavourite => {
  const { userData } = useSelector<RootReducer, AuthState>(
    (state) => state.auth,
  );
  const [favChannels, setFavChannels] = useState<ChannelInstance[]>([]);

  //   const {uid = null} =  userData;
  useEffect(() => {
    if (userData?.uid) {
      let favCache: ChannelInstance[] = [];
      usersRef
        .child(userData.uid)
        .child('favourite')
        .on('child_added', (snap) => {
          const starredChannel = { id: snap.key, ...snap.val() };
          favCache = [...favCache, starredChannel];
          setFavChannels(favCache);
        });

      usersRef
        .child(userData.uid)
        .child('favourite')
        .on('child_removed', (snap) => {
          const channelToRemove = { id: snap.key, ...snap.val() };
          favCache = favCache.filter((channel) => {
            return channel.id !== channelToRemove.id;
          });
          setFavChannels(favCache);
        });
    }
  }, [userData]);

  const addToFavourites = useCallback(
    (channel: ChannelInstance, favCheck: boolean) => {
      if (userData?.uid) {
        const path = `${userData.uid}/favourite`;
        if (favCheck) {
          usersRef.child(path).update({
            [channel.id as string]: {
              name: channel.name,
              details: channel.details,
              createdBy: { ...channel.createdBy },
            },
          });
        } else {
          usersRef
            .child(path)
            .child(channel.id as string)
            .remove((err) => {
              if (err !== null) {
                console.error(err);
              }
            });
        }
      }
    },
    [userData],
  );
  return [addToFavourites, favChannels];
};
export default useFavourite;
