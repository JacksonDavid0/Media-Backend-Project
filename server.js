const cors = require("cors");
const express = require("express");
const app = express();
const MailDev = require("maildev");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./User/routes/user.routes");
const postRouter = require("./Post/routes/post.routes");
const { startAgenda } = require("./User/tasks/user.agenda");
// require("dotenv").config();
const port = process.env.PORT;

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Enable CORS for all requests
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// app.options("*", cors());

// Start MailDev programmatically
const maildev = new MailDev({
  smtp: 587, // SMTP server
  web: 3080, // Web UI
});

// Connect to MongoDB database
mongoose
  .connect(process.env.Mongo_ConnectionLink)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

// Start Agenda
startAgenda();

// Routes

app.use("/user", userRouter);
app.use("/post", postRouter);

// Start the server
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

// Start MailDev server
maildev.listen(() => {
  console.log("MailDev is running on http://localhost:3080");
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down gracefully.");
  await agenda.stop(); // Stop Agenda
  server.close(() => {
    // Stop HTTP server
    console.log("HTTP server closed.");
    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Shutting down gracefully.");
  await agenda.stop(); // Stop Agenda
  server.close(() => {
    // Stop HTTP server
    console.log("HTTP server closed.");
    process.exit(0);
  });
});
