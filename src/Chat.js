import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import "./Chat.css";
import Modal from "./Modal";
import db from "./firebase";
import { selectUser } from "./features/userSlice";
import { selectchatName, selectchatId } from "./features/chatSlice";
import Message from "./Message";
import firebase from "firebase";
import UploadForm from "./UploadForm";
import ImageGrid from "./ImageGrid";
function Chat() {
  const [input, setInput] = useState("");

  const chatName = useSelector(selectchatName);
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);
  const chatId = useSelector(selectchatId);
  const user = useSelector(selectUser);
  useEffect(() => {
    const unsub = () => {
      if (chatId) {
        db.collection("chats")
          .doc(chatId)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) =>
            setMessages(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          );

        db.collection("chats")
          .doc(chatId)
          .collection("images")

          .onSnapshot((snapshot) => {
            let documents = [];
            snapshot.forEach((docs) => {
              documents.push({ ...docs.data(), id: docs.id });
            });
            setImages(documents);
          });
      }
    };
    return unsub();
  }, [chatId]);
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats")
      .doc(chatId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h5>
          To: <span className="chat__name">{chatName}</span>
        </h5>

        <strong>
          <Modal />
        </strong>
      </div>

      <div className="chat_messages">
        <FlipMove>
          {messages?.map(({ id, data }) => (
            <Message contents={data} />
          ))}
        </FlipMove>
        {images?.map((data) => (
          <ImageGrid
            key={data.id}
            url={data.url}
            id={data.id}
            displayName={data.displayName}
            photo={data.photo}
            uid={data.uid}
            email={data.email}
            timestamp={data.timestamp}
          />
        ))}

        {/* <ImageGrid images={images} /> */}
      </div>
      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="iMessage"
            type="text"
          />
          <button onClick={sendMessage}>Send</button>
        </form>

        <UploadForm />
      </div>
    </div>
  );
}

export default Chat;
