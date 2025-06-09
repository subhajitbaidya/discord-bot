const { Client, GatewayIntentBits } = require("discord.js");
const { Scrapper } = require("../services/scrapper.js");
const { data, splitMessage } = require("../services/chat/data.js");
const { runMlModel } = require("../services/chat/mlModel.js");
require("dotenv").config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
  if (message.author.bot) return;
  if (message.content.startsWith("scrape")) {
    const url = message.content.split("scrape")[1].trim();
    console.log(url);
    try {
      const rawData = await Scrapper(url);
      console.log(rawData);
      const prompt = data(rawData);
      const response = await runMlModel(prompt);

      const summary = splitMessage(response);

      console.log(summary);

      console.log(rawData);
      return message.reply({
        content: `Hello ${message.author.username}! \n This is your response: \n ${summary}`,
      });
    } catch (error) {
      console.error("error generating response!,", error);
    }
  }
});

client.on("interactionCreate", (interaction) => {
  console.log("Interaction");
  interaction.reply("success!");
});

client.login(process.env.BOT_TOKEN);
