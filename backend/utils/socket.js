const User = require("../models/UserModel");
const Appointment = require("../models/AppointmentModel");
const dayjs = require("dayjs");

module.exports = function (io) {
  let room = [];
  io.on("connection", (socket) => {
    socket.on("join", async (userEmail) => {
      // find appointment at current time
      const appointment = await Appointment.findOne({
        date: {
          $gte: dayjs().subtract(29, "minutes").toDate(),
          $lte: dayjs().add(29, "minutes").toDate(),
        },
        confirmed: true,
      }).populate("user");
      const admin = await User.findOne({
        admin: true,
        email: userEmail,
      });

      if (appointment?.user?.email === userEmail || admin) {
        room.push(socket.id);
        socket.emit("permission granted");

        if (room.length < 2) {
          socket.emit("waiting");
          console.log("waiting", room);
        }
        const otherUser = room.find(
          (id) => id !== socket.id
        );
        if (otherUser) {
          socket.emit("otherUser", otherUser);
          socket
            .to(otherUser)
            .emit("userJoined", socket.id);
        }

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
      } else {
        socket.emit("error");
      }
    });

    socket.on("disconnect", () => {
      room = room.filter((id) => id !== socket.id);
      console.log("user disconnected", room);
    });
  });
};
