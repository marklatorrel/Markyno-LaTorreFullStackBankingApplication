import React, { useContext, useState, useEffect, useMemo } from "react";
import { auth, db } from "../firebase";
import firebase from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  function getUserInfo() {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setUser(() => ({
          balance: doc.data().balance,
          name: doc.data().name,
          accountNumber: doc.data().accountNumber,
          rewardPoints: doc.data().rewardPoints,
        }));
      });
  }

  function signup(email, password, name) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        name: name,
        balance: 0,
        accountHistory: [],
        rewardPoints: 0,
        accountNumber: new Date().getTime().toString(),
      });
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function socialMediaLogIn(provider){
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
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      login,
      socialMediaLogIn,
      signup,
      logout,
      resetPassword,
      updateEmail,
      updatePassword,
      user,
      setUser,
      getUserInfo,
      
    }),
    [currentUser, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
