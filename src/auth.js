const { sendAuthEmail } = require("./email");

function login(bot, body) {
  const {
    chat: { id },
    text,
  } = body.message;
  console.log("login");
  bot.sendMessage(id, "Please enter your email", { parse_mode: "Markdown" });

  return true;
}

function logout() {
  console.log("logout");
  return true;
}

function sendMail(bot, text) {
  sendAuthEmail(text);
}

module.exports = { login, logout,sendMail };
