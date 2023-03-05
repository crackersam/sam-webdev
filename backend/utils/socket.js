const User = require("../models/UserModel");
const Appointment = require("../models/AppointmentModel");
const dayjs = require("dayjs");

module.exports = function (io) {
  let room = [];
  io.on("connection", (socket) => {
    socket.on("join", () => {
      if (room.length < 2) {
        room.push(socket.id);
      } else {
        socket.emit("error", "something went wrong");
      }

      if (room.length < 2) {
        socket.emit("waiting");
        console.log("waiting", room);
      }
      const otherUser = room.find((id) => id !== socket.id);
      if (otherUser) {
        socket.emit("otherUser", otherUser);
        socket.to(otherUser).emit("userJoined", socket.id);
      }
    });
    socket.on("offer", (payload) => {
      io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", (payload) => {
      io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", (incoming) => {
      io.to(incoming.target).emit(
        "ice-candidate",
        incoming.candidate
      );
    });
    socket.on("disconnect", () => {
      room = room.filter((id) => id !== socket.id);
      console.log("user disconnected", room);
    });
  });
};
