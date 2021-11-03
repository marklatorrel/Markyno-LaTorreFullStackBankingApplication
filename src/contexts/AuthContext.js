import React, { useContext, useState, useEffect, useMemo } from "react";
import { auth, db } from "../firebase";
import firebase from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

//Auth provider is used to gather the confidential information of a logged user.

export function AuthProvider({ children }) {
  //The difference between currentUser and user is that user serves to manage the DOM changes.
  const [currentUser, setCurrentUser] = useState();
  //Initialize the user with default values.
  const [user, setUser] = useState({
    name: "-",
    account: [
      {
        currency: "-",
        balance: 0,
        accountNumber: "-",
        accountHistory: [0],
      },
      {
        currency: "-",
        balance: 0,
        accountNumber: "-",
        accountHistory: [0],
      },
    ],
  });

  //Loading variable to prevent unintended use.
  const [loading, setLoading] = useState(true);

  //In this getUserInfo() we get the name and account from the Firebase Database according to the currentUser ID.

  function getUserInfo() {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setUser(() => ({
          name: doc.data().name,
          account: doc.data().account,
        }));
      });
  }

  //In this signup() we create an account in firebase with default values.

  function signup(email, password, name) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return db
        .collection("users")
        .doc(cred.user.uid)
        .set({
          name: name,
          account: [
            {
              currency: "USD",
              balance: 0,
              accountNumber: "101" + new Date().getTime().toString(),
              accountHistory: [0],
            },
            {
              currency: "EUR",
              balance: 0,
              accountNumber: "102" + new Date().getTime().toString(),
              accountHistory: [0],
            },
          ],
        });
    });
  }

  //In this login() we ask Firebase for the JSON web token

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // socialMediaLogIn() is used to log in using a third party company like Google, if it detects that is a new user
  //it creates one with default values in the database.

  function socialMediaLogIn(provider) {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const {
          additionalUserInfo: { isNewUser },
        } = res;
        if (isNewUser) {
          console.log("new user");
          return db
            .collection("users")
            .doc(res.user.uid)
            .set({
              name: res.user.displayName,
              account: [
                {
                  currency: "USD",
                  balance: 0,
                  accountNumber: "101" + new Date().getTime().toString(),
                  accountHistory: [0],
                },
                {
                  currency: "EUR",
                  balance: 0,
                  accountNumber: "102" + new Date().getTime().toString(),
                  accountHistory: [0],
                },
              ],
            });
        }
      })
      .catch((error) => {
        return error;
      });
  }

  //logout() works to close the session
  function logout() {
    return auth.signOut();
  }

  //When onAuthStateChanged changes state it fill set the current user.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  //Since getUserInfo and the other functions are expensive operations, useMemo was used to
  //avoid potential problems.
  const value = useMemo(
    () => ({
      currentUser,
      login,
      socialMediaLogIn,
      signup,
      logout,
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
