// Test
const { Scrapper } = require("../services/scrapper.js");
const targetURL =
  "https://www.geeksforgeeks.org/python-programming-language-tutorial/";

async function ScrapTextData(req, res) {
  try {
    const data = await Scrapper(targetURL);
    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error scraping:", error.message);
    res.status(500).send("Error scraping website");
  }
}

module.exports = {
  ScrapTextData,
};
