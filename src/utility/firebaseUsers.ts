import firebase from 'config/firebase.prod';
import md5 from 'md5';
const usersRef = firebase.database().ref('users');

export const createUser = async (
  email: string,
  password: string,
  username: string,
) => {
  try {
    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    createdUser?.user &&
      createdUser.user
        .updateProfile({
          displayName: username,
          photoURL: `http://gravatar.com/avatar/${md5(
            createdUser.user?.email as string,
          )}?d=identicon`,
        })
        .then(() => {
          saveUser(createdUser).then(() => {
            console.log('user saved');
          });
        });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loginUser = async (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signoutUser = async () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('signed out!');
      return true;
    })
    .catch(() => {
      return false;
    });
};

const saveUser = async (createdUser: firebase.auth.UserCredential) => {
  if (createdUser?.user) {
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  }
};
