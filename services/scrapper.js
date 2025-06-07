const cheerio = require("cheerio");
const axios = require("axios");

async function Scrapper(targetURL) {
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
    return texts;
  } catch (error) {
    console.error("Error parsing data", error);
    return []; 
  }
}

module.exports = { Scrapper };
