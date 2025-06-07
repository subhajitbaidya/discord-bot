const { Ollama } = require("ollama");
const { data } = require("../chat/data.js");

async function run() {
  const ollama = new Ollama({ host: "http://127.0.0.1:11434" });

  const text = data();

  const message = {
    role: "user",
    content: `Summarize this following text  ${text} \n. Keep all the important information and generate a response within a maximum of 500 words.`,
  };
  const response = await ollama.chat({
    model: "llama3.2",
    messages: [message],
    stream: true,
  });

  for await (const part of response) {
    process.stdout.write(part.message.content);
  }
}

run();
