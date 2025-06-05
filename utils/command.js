const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commands = [
  {
    name: "scrape",
    description: "Scrapes text data from a website",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error reloading commands:", error);
  }
})();
