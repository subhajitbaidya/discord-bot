const express = require("express");
const {connectMongoDB} = require("./database/connectMongo.js")
const ScrapeRouter = require("./routes/scrapper.js");

require("./bot/bot.js");

const app = express();
const PORT = process.env.PORT || 8000;

connectMongoDB()
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("MongoDB error", err));

app.use("/", ScrapeRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/scrape`);
});
