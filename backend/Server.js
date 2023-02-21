const express = require("express");
const cookieParser = require("cookie-parser");
const {
  errorHandler,
} = require("./middleware/ErrorHandlerMiddleware");
require("dotenv").config();
const { connectDB } = require("./config/db");
const app = express();

require("./utils/sendMail");

connectDB();

app.use(cookieParser());

app.use(express.json());

app.use("/api/users", require("./routes/UserRoute"));

app.use("/api/assets", require("./routes/AssetsRoute"));

app.use("/api/admin", require("./routes/AdminRoute"));

app.use(
  "/api/appointments",
  require("./routes/AppointmentRoute")
);

app.use(
  "/api/documents",
  require("./routes/DocumentRoute")
);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
