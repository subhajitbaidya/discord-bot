const cheerio = require("cheerio");
const axios = require("axios");
// Test
const targetURL = "https://timesofindia.indiatimes.com/news";

async function ScrapTextData(req, res) {
  try {
    const response = await axios.get(targetURL);
    const $ = cheerio.load(response.data);

    const texts = [];

    $("h1, h2, h3, p").each((i, el) => {
      const text = $(el).text().trim();
      if (text) {
        texts.push(text);
      }
    });

    res.json({ count: texts.length, data: texts });
  } catch (error) {
    console.error("Error scraping:", error.message);
    res.status(500).send("Error scraping website");
  }
}

module.exports = {
  ScrapTextData,
};
