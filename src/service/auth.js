import firebase from "../firebase";
import { auth, db } from "../firebase";

const socialMediaAuth = (provider) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      const {
        additionalUserInfo: { isNewUser },
      } = res;
      if (isNewUser) {
        console.log("new user");
        return db.collection("users").doc(res.user.uid).set({
          name: res.user.displayName,
          balance: 0,
          accountHistory: [],
          rewardPoints: 0,
          accountNumber: new Date().getTime().toString(),
        });
      }
    })
    .catch((error) => {
      return error;
    });
};

export default socialMediaAuth;
