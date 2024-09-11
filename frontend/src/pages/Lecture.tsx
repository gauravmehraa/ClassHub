import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../utils/p2p";
import { useSocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

const Lecture: React.FC = () => {
  const socket = useSocketContext();
  const { authUser } = useAuthContext();

  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const [remoteEmail, setRemoteEmail] = useState("");
  const [myStreamMuted, setMyStreamMuted] = useState(true);
  const [remoteStreamMuted, setRemoteStreamMuted] = useState(true);

  const buttonClass = "mx-auto btn btn-md bg-primary text-white border-none cursor-pointer hover:bg-white hover:text-black"

  const handleUserJoined = useCallback(
    ({ email, id }: { email: string; id: string }) => {
      setRemoteEmail(email);
      setRemoteSocketId(id);
    },
    []
  );

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    if (!socket) {
      console.log("No Socket");
      return;
    }
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }: { from: string; offer: RTCSessionDescriptionInit }) => {
      if (!socket) {
        console.log("No Socket");
        return;
      }
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (myStream) {
      for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
      }
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }: { from: string; ans: RTCSessionDescriptionInit }) => {
      peer.setLocalDescription(ans);
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    if (!socket) {
      console.log("No Socket");
      return;
    }
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }: { from: string; offer: RTCSessionDescriptionInit }) => {
      const ans = await peer.getAnswer(offer);
      if (!socket) {
        console.log("No Socket");
        return;
      }
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }: { ans: RTCSessionDescriptionInit }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", (ev: RTCTrackEvent) => {
      const [remoteStream] = ev.streams;
      setRemoteStream(remoteStream);
    });
  }, []);

  useEffect(() => {
    if (!socket) {
      console.log("No Socket");
      return;
    }
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="flex flex-col text-black py-4 sm:py-8 overflow-auto max-h-screen w-full">
      <div className="hidden md:block text-3xl text-center font-semibold py-4">Lecture</div>
      <div className="text-lg text-center my-6">
        {remoteSocketId ? "Connected" : "Room Empty"}
      </div>
      { myStream ?
        <button
          className={buttonClass}
          onClick={sendStreams}
        >Video</button>:
        null
      }
      {
      remoteSocketId && (!myStream || !remoteStream)? 
        <button
        className={buttonClass}
          onClick={handleCallUser}
        >Join</button>:
        null
      }
      <div className="flex flex-row flex-wrap justify-center mt-12 w-full sm:w-10/12 mx-auto">
        <div className="mx-auto">
          <div>{myStream && authUser.email}</div>
          { 
            myStream ?
            <div>
              <ReactPlayer playing muted={myStreamMuted} height="200px" width="400px" url={myStream} />
              <button
                className={buttonClass}
                onClick={(e) => setMyStreamMuted(!myStreamMuted)}
              >{myStreamMuted? "Unmute":"Mute"}</button>
            </div>
            :
            null
          }
        </div>
        <div className="mx-auto">
          <div>{remoteEmail}</div>
          {
            remoteStream ?
            <div>
              <ReactPlayer playing muted={remoteStreamMuted} height="200px" width="400px" url={remoteStream} />:
              <button
                  className={buttonClass}
                  onClick={(e) => setRemoteStreamMuted(!remoteStreamMuted)}
                >{remoteStreamMuted? "Unmute":"Mute"}</button>
            </div>:
            null
          }
        </div>
      </div>
    </div>
  );
};

export default Lecture;
