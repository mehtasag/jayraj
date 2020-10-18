import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import { selectUser, login, logout } from "./features/userSlice";
import Imessage from "./Imessage";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [main, setMain] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        authUser.getIdTokenResult().then((idTokenResult) => {
          authUser.admin = idTokenResult.claims.admin;
          setMain(authUser.admin);
        });
        // Is Logged In
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        // Logged Out
        dispatch(logout());
      }
    });
  }, []);
  console.log(main);
  return (
    <Router>
      <div className="app">
        {user ? (
          <>
            <Imessage main={main} />
          </>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}

export default App;
