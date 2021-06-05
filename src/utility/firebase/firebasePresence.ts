import firebase from 'config/firebase.prod';
const usersRef = firebase.database().ref('users');
const connectedRef = firebase.database().ref('.info/connected');
const presenceRef = firebase.database().ref('presence');
import { User, FetchUser, UpdateUserStatus } from 'types';

export const startUsersSub = async (
  dispatcher: FetchUser,
  currUserId: string,
) => {
  let users: User[] = [];
  usersRef.on('child_added', (snap) => {
    if (currUserId !== snap.key) {
      const user = snap.val();
      user['uid'] = snap.key;
      user['status'] = 'offline';
      users = [...users, user];
      dispatcher(users);
    }
  });
};

export const startPresenceSub = (currUserId: string) => {
  connectedRef.on('value', (snap) => {
    if (snap.val() === true) {
      const ref = presenceRef.child(currUserId);
      ref.set(true);
      ref.onDisconnect().remove((err) => {
        if (err !== null) {
          console.error(err);
        }
      });
    }
  });
};

export const presenceOnAdd = (
  callback: UpdateUserStatus,
  currUserId: string,
) => {
  presenceRef.on('child_added', (snap) => {
    const uid = snap.key;
    if (currUserId !== uid) {
      const ref = presenceRef.child(uid as string);
      ref.on('value', (s) => {
        const va = s.val();
        callback(snap.key as string, va);
      });
      ref.off();
    }
  });
};

export const presenceOnRemove = (
  callback: UpdateUserStatus,
  currUserId: string,
) => {
  presenceRef.on('child_removed', (snap) => {
    if (currUserId !== snap.key) {
      callback(snap.key as string, false);
    }
  });
};
