const express = require("express");

const ScrapeRouter = require("./routes/scrapper.js");

require("./bot/bot.js");

const app = express();
const PORT = 3000;

app.use("/", ScrapeRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/scrape`);
});
