const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  console.log(message.content);
  if (message.author.bot) return;
  message.reply({ content: `Hello ${message.author.username}!` });
});

client.on("interactionCreate", (interaction) => {
  console.log("Interaction");
  interaction.reply("success!");
});

client.login(process.env.BOT_TOKEN);
