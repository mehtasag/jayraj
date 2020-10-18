import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./ImageGrid.css";
const Message = forwardRef(({ timestamp, url, id, email, photo }, ref) => {
  const user = useSelector(selectUser);
  return (
    <div
      key={id}
      ref={ref}
      className={`imageGrid ${user.email === email && "imageGrid__sender"}`}
    >
      <Avatar className="imageGrid__photo" src={photo} />
      <img className="imageGrid__image" src={url} alt="" />
      <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
    </div>
  );
});

export default Message;
