import { useState, useEffect } from "react";
import db, { projectStorage } from "./firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectchatName, selectchatId } from "./features/chatSlice";
import { selectUser } from "./features/userSlice";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const chatId = useSelector(selectchatId);
  const user = useSelector(selectUser);
  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = db
      .collection("chats")
      .doc(chatId)
      .collection("images");

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;

        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();

        collectionRef.add({
          url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          uid: user.uid,
          photo: user.photo,
          email: user.email,
          displayName: user.displayName,
        });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
