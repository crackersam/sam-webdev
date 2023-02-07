const express = require("express");
const { errorHandler } = require("./middleware/ErrorHandlerMiddleware");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", require("./routes/UserRoute"));

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
