import React, { useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const MessageContext = React.createContext();

const socket = io.connect("https://photocornerchat.herokuapp.com");

export function useMessage() {
  return useContext(MessageContext);
}

export function MessageProvider({ children }) {
  const [room, setRoom] = useState("");
  const [room1, setRoom1] = useState("");
  const [start, setStart] = useState(false);
  const [relMessages, setRelMessages] = useState([]);

  const joinRoom = (username, room) => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      console.log(`${username} joined room ${room}`);
      setStart(!start);
    }
  };

  const getRelMessages = async (room) => {
    const res = await fetch("https://zamuka.herokuapp.com/hidden/messages");
    const messages = await res.json();
    const relMess = messages.filter((m) => m.room === room || m.room1 === room);
    setRelMessages(relMess);
  };

  useEffect(() => {
    getRelMessages();
  }, []);


  const startChat = async (e) => {
    await setRoom(e + user._id);
    await setRoom1(user._id + e);
    console.log(room);
    await joinRoom(user.username, e+user._id);
    await getRelMessages(e + user._id);
    console.log('elleh');
  };

  return (
    <MessageContext.Provider
      value={{
        room,
        setRoom,
        socket,
        room1,
        relMessages,
        setRelMessages,
        setRoom1,
        joinRoom,
        start,
        setStart,
        startChat,
        getRelMessages
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
