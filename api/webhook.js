// Require our Telegram helper package
const TelegramBot = require("node-telegram-bot-api");
const { sendAuthEmail  } = require("../src/email");
const { commands } = require("../src/command-book");
require("dotenv").config();

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
  try {
    // Create our new bot handler with the token
    // that the Botfather gave us
    // Use an environment variable so we don't expose it in our code
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN2);

    // Retrieve the POST request body that gets sent from Telegram
    const { body } = request;

    // Ensure that this is a message being sent
    if (body.message) {
      // Retrieve the ID for this chat
      // and the text that the user sent
      console.log(body);
      const {
        chat: { id },
        text,
      } = body.message;

      if(text.charAt(0) === '/'){
        commands(text)
      }
      // Create a message to send back
      // We can use Markdown inside this
      const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;

      // Send our new message back in Markdown and
      // wait for the request to finish
      console.log(message);
      // sendAuthEmail(message)

      await bot.sendMessage(id, text, { parse_mode: "Markdown" });
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error("Error sending message");
    console.log(error.toString());
  }

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  // The message here doesn't matter.
  response.send("OK");
};
