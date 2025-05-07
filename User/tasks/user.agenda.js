const { Agenda } = require("agenda");
const User = require("../model/user.model");

let agenda;

async function startAgenda(connectedDb) {
  agenda = new Agenda({
    db: { address: connectedDb },
  });

  agenda.define("delete unverified user", async (job) => {
    const userId = job.attrs.data.userId;

    console.log(`Checking to delete user ${userId}`);
    await User.deleteOne({ _id: userId, verified: false });
  });

  agenda.start();
  console.log("Agenda schedule started");
}

// const agenda = new Agenda({
//   db: { address: connectedDb },
// });

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
