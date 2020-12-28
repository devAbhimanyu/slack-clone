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

const saveUser = async (createdUser: firebase.auth.UserCredential) => {
  if (createdUser?.user) {
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  }
};
