const { gpt } = require("gpti");
const gpt4 = async (client, m, text) => {
  gpt(
    {
      messages: [
        {
          role: "assistant",
          content: "Hello! How are you today?",
        },
      ],
      prompt: text,
      model: "GPT-4",
      markdown: false,
    },
    (err, data) => {
      if (err != null) {
        console.log(err);
        client.sendMessage(m.sender, { text: "```Something Gone Wrong```" });
      } else {
        console.log(data);
        client.sendMessage(m.sender, { text: data.gpt });
      }
    }
  );
};
module.exports = gpt4;
