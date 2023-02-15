const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = mongoose.connection;
    // check connection
    conn.on("error", (err) => {
      console.error(`connection error: ${err.message}`);
    });
    conn.once("open", () => {
      console.log("MongoDB Connected");
    });

    // connection
    await mongoose.connect(process.env.MONGO_URI);

    return null;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
