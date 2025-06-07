const ScrappedData = require("../chat/data.json");
function data() {
  const rawText = ScrappedData.data
    .map((str) => str.trim()) 
    .filter((str) => str.length > 0)
    .join(". "); 

  return rawText;
}

module.exports = { data };
