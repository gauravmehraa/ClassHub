import React, { useState, useCallback, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

const LobbyScreen: React.FC = () => {
  const [room, setRoom] = useState<string>("");

  const { authUser } = useAuthContext();
  const socket = useSocketContext();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (socket) {
        socket.emit("room:join", { email: authUser.email, room });
      }
    },
    [authUser.email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data: { email: string; room: string }) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (socket) {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          className="input bg-white"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
