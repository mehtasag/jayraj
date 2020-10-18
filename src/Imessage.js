import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./Imessage.css";
function Imessage({ main }) {
  return (
    <div className="imessage">
      <Sidebar main={main} />

      <Chat />
    </div>
  );
}

export default Imessage;
