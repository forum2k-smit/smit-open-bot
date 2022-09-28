const { login, logout } = require("./auth");

async function commands(command) {
    let result;
  switch (command) {
    case "/login":
      result = login();
      break;
    case "/logout":
      result = logout();
      break;
    default:
      console.log("Unknown command: " + command);
      result = false;
      break;
  }
}
module.exports = { commands };
