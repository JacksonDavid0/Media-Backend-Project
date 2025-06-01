const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const MailDev = require("maildev");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const postRouter = require("./Post/routes/post.routes");
const { startAgenda } = require("./User/src/tasks/user.agenda");
const userRouter = require("./User/src/routes/user.routes");
require("dotenv").config();
const remoteDbUrl = process.env.REMOTE_DB_URL;
const localDbUrl = process.env.LOCAL_DB_URL;
const port = process.env.PORT;
let connectedDb;

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

app.options("*", cors());

// Start MailDev programmatically
const maildev = new MailDev({
  smtp: 587, // SMTP server
  web: 3080, // Web UI
});

// Function to connect to the database
const connectToDatabase = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true, // These options are recommended
      useUnifiedTopology: true,
      // Remove useCreateIndex and useFindAndModify as they are deprecated in recent Mongoose versions
    });
    console.log(`Connected to MongoDB at ${dbUrl}`);
    connectedDb = dbUrl;
    return true; // Indicate successful connection
  } catch (err) {
    console.error(`Failed to connect to MongoDB at ${dbUrl}`);
    return false; // Indicate failed connection
  }
};

// Connect to the database
connectToDatabase(remoteDbUrl).then((connected) => {
  if (!connected) {
    console.log("Remote connection failed, attempting local connection...");
    return connectToDatabase(localDbUrl).then((localConnected) => {
      if (!localConnected) {
        console.error("Both remote and local connections failed. Exiting.");
        return process.exit(1); // Exit with an error code
      }
      starter();
    });
  }
  starter();
});

// Start Agenda
async function starter() {
  if (connectedDb) {
    await startAgenda(connectedDb);
  }
}

// Routes

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

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
