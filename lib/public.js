const Users = require("../mongo/model/index");

const SendSMS = async (client, m, msg) => {
  try {
    const Data = await Users.find({});
    let i = 0;
    const init = setInterval(async () => {
      if (i >= Data.length) clearInterval(init);
      const user = Data[i];
      await client.sendMessage(user.id, { text: msg });
      i = i + 1;
    }, 100);
  } catch (error) {
    console.log(error);
    client.sendMessage(m.sender, { text: error.message });
  }
};
module.exports = SendSMS;
