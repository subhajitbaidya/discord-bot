function data(raw) {
  if (!Array.isArray(raw)) {
    throw new Error("Expected an array of strings as input");
  }
  return raw
    .map((str) => str.trim())
    .filter((str) => str.length > 0)
    .join(". ");
}

function splitMessage(message, maxLength = 2000) {
  // Remove <think>...</think> block if present
  const cleanMessage = message.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  const lines = cleanMessage.split("\n");
  const chunks = [];
  let current = "";

  for (const line of lines) {
    if ((current + line + "\n").length > maxLength) {
      chunks.push(current);
      current = "";
    }
    current += line + "\n";
  }

  if (current.length > 0) {
    chunks.push(current);
  }

  return chunks;
}

module.exports = { data, splitMessage };
