const axios = require("axios");
const activate = async () => {
  try {
    const res = await axios.post(
      "https://faucetearner.org/api.php?act=faucet",
      {},
      {
        headers: {
          Host: "faucetearner.org",
          "Content-Length": "2",
          "Sec-Ch-Ua":
            '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Sec-Ch-Ua-Mobile": "?1",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36",
          "Sec-Ch-Ua-Platform": '"Android"',
          Origin: "https://faucetearner.org",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          Referer: "https://faucetearner.org/faucet.php",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "en-US,en;q=0.9",
          Cookie:
            "pid=757772534530; googtrans=/en/en; reg=1; login=1; user=894550846617-45.55.40.168; show_nt1=1; Hm_lvt_2b147ccaeef7e49f5f9553cadfdf8428=1712299490; Hm_lpvt_2b147ccaeef7e49f5f9553cadfdf8428=1712299637",
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
module.exports = activate;
activate();
