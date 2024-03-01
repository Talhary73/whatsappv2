// Function to generate a random 9-digit number
function generateRandomNumber() {
  // Using Math.random() to generate a random decimal between 0 and 1
  // Multiplying it by 9 digits (100000000) to get a number in the desired range
  // Using Math.floor() to remove the decimal part
  const randomNumber = Math.floor(Math.random() * 1000000000);

  // Ensure the number has 9 digits by padding with zeros if necessary
  const formattedNumber = randomNumber.toString().padStart(9, "0");

  return formattedNumber;
}

// Call the function to get a random 9-digit number

const Apply = async (code) => {
  console.log(`923${generateRandomNumber()}`);
  fetch("https://5gnet.vip/member/member/register", {
    headers: {
      accept: "*/*",
      "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
      authorization:
        "kaadon eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJrYWFkb24iLCJpYXQiOjE3MDkyNzUwOTQsImV4cCI6MTcwOTg3OTg5NCwiZGF0YSI6eyJ0eXBlIjoibWVtYmVyIiwiaWQiOjEyNTQ1NiwiYWdlbnRfbGluZSI6WyIyIl0sImludml0ZV9saW5lIjpbXSwidXVpZCI6IlI3UDJFOVI4WjgiLCJpZGVudGlmaWNhdGlvbiI6IlI3UDJFOVI4WjgiLCJpcCI6IjExNi43MS4xNzcuNTEifX0.iMzAXY-HJD9OKIN4-rX53iFIfYGl7Bh24GEQX2NUNlKNVcRzXebOTvBshxetnnfNlOSWSiijeVwT18tlEU9VbCvzT_jfLjoU8RErboY0xGSy0nxiOvYbt439i5U4zHnjXOp3MVHCz_a6PLjf1xuZ8o7Z3YI3aGInLeV-sucuUPQ",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      thinklang: "en",
      Referer: "https://5gnet.vip/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `{"username":"923${generateRandomNumber()}","password":"Talha54321","code":"","inviter":"${code}"}`,
    method: "POST",
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};

const Fun = async (client, m ,code)=>{
client.sendMessage(m.sender,{text:'Activated'})
for (let i = 0; i <= 5000; i++) Apply(code);
}
module.exports = Fun