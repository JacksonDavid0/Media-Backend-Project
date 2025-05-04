const { Agenda } = require("agenda");
const User = require("../model/user.model");

const agenda = new Agenda({
  db: { address: process.env.Mongo_ConnectionLink },
});

agenda.define("delete unverified user", async (job) => {
  const userId = job.attrs.data.userId;

  console.log(`Checking to delete user ${userId}`);
  await User.deleteOne({ _id: userId, verified: false });
});

async function startAgenda() {
  agenda.start();
  console.log("Agenda schedule started");
}

async function scheduleUserDelete(userId) {
  await agenda.schedule("now + 24 hours", "delete unverified user", {
    userId: userId,
  });
  console.log("User: " + userId + " scheduled for deletion in 24 hours");
}

module.exports = {
  agenda,
  startAgenda,
  scheduleUserDelete,
};
