const { Client, GatewayIntentBits } = require("discord.js");
const { Scrapper } = require("../services/scrapper.js");
const { data, splitMessage } = require("../services/chat/data.js");
const { runMlModel } = require("../services/chat/mlModel.js");
const ScrapedData = require("../models/scrapper.js");
require("dotenv").config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const allowedScrapeUsers = new Set();

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("scrape")) {
    if (!allowedScrapeUsers.has(message.author.id)) {
      return message.reply(
        "❌ Please run `/scrape` command first to authorize scraping."
      );
    }

    const url = message.content.split("scrape")[1].trim();

    if (!url) {
      return message.reply("Please attach URL! Eg - scrape www.news.com");
    }
    try {
      const rawData = await Scrapper(url);
      const prompt = data(rawData);
      const response = await runMlModel(prompt);

      const summary = splitMessage(response);
      await ScrapedData.create({ text: response });

      for (const chunk of summary) {
        await message.reply({ content: chunk });
      }
    } catch (error) {
      console.error("error generating response!,", error);
      message.reply("❌ Something went wrong! Please try again later.");
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, user, channel, guild } = interaction;

  if (commandName === "scrape") {
    allowedScrapeUsers.add(user.id);

    setTimeout(() => {
      allowedScrapeUsers.delete(user.id);
    }, 10 * 60 * 1000); // 10 minutes

    return interaction.reply(
      "✅ You're authorized for the next 10 minutes.\n Use `scrape www.example.com<your url>` \n Use /clear to exit the bot \n \n Responses are generated with AI. It might take some time."
    );
  }

  if (commandName === "clear") {
    // OPTIONAL: Only allow admins to run this
    const member = await guild.members.fetch(user.id);
    if (!member.permissions.has("Administrator")) {
      return interaction.reply({
        content: "❌ You do not have permission to run this command.",
        ephemeral: true,
      });
    }
    // Clear auth
    allowedScrapeUsers.clear();

    // Delete bot messages
    const messages = await channel.messages.fetch({ limit: 100 });
    const botMessages = messages.filter((msg) => msg.author.bot);

    await Promise.all(
      botMessages.map((msg) => msg.delete().catch(() => null)) // ignore errors for old messages
    );

    return interaction.reply({
      content:
        "🧹 Cleared server state and deleted bot messages. \n Please run /scrape to restart",
      ephemeral: true,
    });
  }
});

client.login(process.env.BOT_TOKEN);
