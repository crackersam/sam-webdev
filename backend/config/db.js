const mongoose = require("mongoose");

let gfs;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    conn.connection.on("open", () => {
      // Init stream
      gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads",
      });
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = { connectDB, gfs };
