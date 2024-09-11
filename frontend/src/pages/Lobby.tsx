import React, { useState, useCallback, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";
import useGetSubjects from "../hooks/subjects/useGetSubjects";

const LobbyScreen: React.FC = () => {
  const { authUser } = useAuthContext();
  const socket = useSocketContext();

  const navigate = useNavigate();
  const { subjects } = useGetSubjects();

  const [room, setRoom] = useState<string>("");

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
      navigate(`/lecture/${room}`);
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
    <div className="flex flex-col text-black py-4 sm:py-8 overflow-auto max-h-screen w-full">
      <div className="hidden md:block text-3xl text-center font-semibold py-4">Lobby</div>
      <form onSubmit={handleSubmitForm}>
        <div className="mt-6 flex flex-col">
          <label className="ml-2 font-semibold">Subject</label>
          <select
            className="grow select select-bordered bg-white focus:outline-none ml-2"
            value={room}
            autoComplete="off"
            onChange={(e) => setRoom(e.target.value)}
          >
            <option value="" disabled={room !== ""}>Select Subject</option>
            { typeof(subjects) !== "undefined" && subjects.map((subject: any) => (
              <option key={subject._id} value={subject._id}>{subject.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className='btn btn-md bg-primary text-white border-none cursor-pointer hover:bg-white hover:text-black'
        >Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
