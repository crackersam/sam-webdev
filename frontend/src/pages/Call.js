import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { error, success } from "../features/call/CallSlice";
import { useNavigate } from "react-router-dom";

const Call = () => {
  const { email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (!email) {
      return navigate("/login");
    }
    socketRef.current = io();
    socketRef.current.emit("join", email);

    socketRef.current.on("error", () => {
      dispatch(
        error("Please request an appointment first")
      );
      return navigate("/appointments");
    });

    const configuration = async () => {
      userStream.current =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
      userVideo.current.srcObject = userStream.current;

      socketRef.current.on("otherUser", (userID) => {
        callUser(userID);
        otherUser.current = userID;
      });

      socketRef.current.on("userJoined", (userID) => {
        setWaiting(false);
        otherUser.current = userID;
      });

      socketRef.current.on("offer", handleRecieveCall);

      socketRef.current.on("answer", handleAnswer);

      socketRef.current.on(
        "ice-candidate",
        handleNewICECandidateMsg
      );
    };

    socketRef.current.on("permission granted", () => {
      dispatch(success("Connecting..."));
      configuration();
    });
    socketRef.current.on("waiting", () => {
      dispatch(success("Waiting for other user..."));
      setWaiting(true);
    });
  }, [
    socketRef,
    userVideo,
    partnerVideo,
    dispatch,
    navigate,
    email,
  ]);

  const callUser = (userID) => {
    peerRef.current = createPeer(userID);
    userStream.current
      .getTracks()
      .forEach((track) =>
        peerRef.current.addTrack(track, userStream.current)
      );
  };

  function createPeer(userID) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () =>
      handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming) {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) =>
            peerRef.current.addTrack(
              track,
              userStream.current
            )
          );
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("answer", payload);
      });
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current
      .addIceCandidate(candidate)
      .catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    partnerVideo.current.srcObject = e.streams[0];
  }

  return (
    <>
      {waiting && <h1>Waiting for other user...</h1>}
      <video ref={userVideo} autoPlay />
      <video ref={partnerVideo} autoPlay />
    </>
  );
};

export default Call;
