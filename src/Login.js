import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import iMessageLogo from "./imessage.png";
import { Button } from "@material-ui/core";
function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img src={iMessageLogo} alt="" />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
