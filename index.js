const express = require("express");
const PORT = 2000;

const app = express();

app.get("/", (req, res) => {
  res.end("Welcome to express");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
