const { login, logout, sendMail } = require("./auth");
const { starter } = require("./starter");

async function commands(bot, body) {
  let result;
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const {
    chat: { id },
    text,
  } = body.message;
  switch (text) {
    case "/login":
      result = login(bot, body);
      break;
    case "/logout":
      result = logout();
      bot.sendMessage(id, result, { parse_mode: "Markdown" });
      break;
    case text.value.match(validRegex):
      parse_mode(text, bot);
      break;
    case "/start":
      starter(bot, body);
    default:
      console.log("Unknown command: " + text);
      result = false;
      bot.sendMessage(id, "Unknown command: " + text, {
        parse_mode: "Markdown",
      });
      break;
  }
}

function parse_mode(mail_id, bot) {
  if (mail_id.split("@")[0] === "smit.smu.edu.in") {
    console.log("Valid Email Address: " + mail_id);
    sendMail(mail_id);
    bot.sendMessage(id, null, { parse_mode: "Markdown" });
  } else {
    console.log("Invalid Email Address: " + mail_id);
    bot.sendMessage(mail_id, "Invalid Email Address: " + mail_id);
  }
}

module.exports = { commands };
