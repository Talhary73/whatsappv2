const { G4F } = require("g4f");
const GPT = new G4F();
const messages = [
	{ role: "user", content: "Hi, what's up?"}
];
GPT.chatCompletion(messages).then(console.log);