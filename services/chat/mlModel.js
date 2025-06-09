const { Ollama } = require("ollama");

async function runMlModel(ScrappedString) {
  const ollama = new Ollama({ host: "http://127.0.0.1:11434" });

  const maxLength = 5000;
  const text = ScrappedString.slice(0, maxLength);

  const message = {
    role: "user",
    content: `Summarize this following text  ${text} \n. Keep all the important information and generate a response within a maximum of 500 words.`,
  };

  let result = "";
  const response = await ollama.chat({
    model: "deepseek-r1:1.5b",
    messages: [message],
    stream: true,
  });

  for await (const part of response) {
    process.stdout.write(part.message.content);
    result += part.message.content;
  }

  return result;
}

module.exports = {
  runMlModel,
};
