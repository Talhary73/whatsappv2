const axios = require("axios");
const cheerio = require("cheerio");
const tough = require("tough-cookie");
function generateRandomString(length) {
  const characters = "0123456789abcdef";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
function generateRandomNumber() {
  const min = 100000000; // Minimum 9-digit number
  const max = 999999999; // Maximum 9-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getToken = async () => {
  const { data, headers } = await axios.get(
    "https://reunexa.com/register/237G45N"
  );
  const $ = cheerio.load(data);
  const cookieHeaders = headers["set-cookie"];

  // Print the cookie headers
  console.log(cookieHeaders);
  // Extract the CSRF token from the meta tag
  const csrfToken = $('meta[name="csrf-token"]').attr("content");

  console.log(csrfToken);
  
  return {
    csrfToken,
    cookieHeaders: cookieHeaders
      .map((cookie) => {
        const match = cookie.match(/([^=]+)=([^;]+)/);
        return match ? `${match[1]}=${match[2]}` : null;
      })
      .filter((cookie) => cookie !== null)
      .join("; "),
  };
};

// getToken();
const Rexuna = async (code) => {
  try {
    const { csrfToken, cookieHeaders: cookies } = await getToken();

    const headers = {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua":
        '"Microsoft Edge";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie: cookies,
      Referer: `https://reunexa.com/register/${code}`,
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };

    const data = `_token=${csrfToken}&firstname=Muhammad+Talha&email=${generateRandomString(
      20
    )}%40gmail.com&mobile=${generateRandomNumber()}&password=Talha54321&password_confirmation=Talha54321&referBy=${code}`;
    const res = await axios.post("https://reunexa.com/register", data, {
      headers,
    });

    await registerActivate(cookies);
    await dashboard(cookies);
    await ActivateRexuna(cookies, csrfToken);

    require("fs").writeFileSync("rexuna.html", res.data);
  } catch (error) {
    console.log(error);
  }
};
const ActivateRexuna = async (cookies, token) => {
  try {
    const headers = {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-GB,en;q=0.9",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua":
        '"Microsoft Edge";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie: cookies,
      Referer: "https://reunexa.com/user/dashboard",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };

    const body = `_token=${token}&plan_id=1&wallet_type=deposit_wallet&amount=6`;
    const { data } = await axios.post("https://reunexa.com/user/buy", body, {
      headers,
    });

    return data;
    // console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};

const dashboard = async (cookies) => {
  const { data } = await axios.get("https://reunexa.com/user/dashboard", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-GB,en;q=0.9",
      "cache-control": "max-age=0",
      "sec-ch-ua":
        '"Microsoft Edge";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie: cookies,
      Referer: "https://reunexa.com/register",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
  require("fs").writeFileSync("dashboard.html", data);
  return data;
};
// dashboard();
Rexuna("237G45N").then((res) => console.log(res));
// axios
//   .post(
//     "https://reunexa.com/register",
//     "_token=KkMPV87Gu1X7mSfeVkfAgiYRfTYgBl8YgQy5GD3y&firstname=Muhammad+Talha&email=talhariaz5425312869%40gmail.com&mobile=3345425869&password=Talha54321&password_confirmation=Talha54321&referBy=reunexa",
//     {
//       headers: {
//         accept:
//           "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//         "accept-language": "en-GB,en;q=0.9",
//         "cache-control": "max-age=0",
//         "content-type": "application/x-www-form-urlencoded",
//         "sec-ch-ua":
//           '"Microsoft Edge";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": '"Windows"',
//         "sec-fetch-dest": "document",
//         "sec-fetch-mode": "navigate",
//         "sec-fetch-site": "same-origin",
//         "sec-fetch-user": "?1",
//         "upgrade-insecure-requests": "1",
//         cookie:
//           "lastPopupTime=1712228876618; XSRF-TOKEN=eyJpdiI6InEwRDdSdzlVM3ZhcjRDcGFNdlVER3c9PSIsInZhbHVlIjoiTy9JbDlHQjFuWjI2cmZTai9iemIwTjlrT1cveHU4QkdhcTNsMWFlb1Z4NnVCZmo3Tk13WEd4VmZJOGtOS2dHMlRNc29nOG40S0dWRkRqN3RJdE85eUNvOERrZkIyV2tqd2dMNW5HMmFtb1pkbWFwRHhmVUZmcGtLT1RELzNHOXEiLCJtYWMiOiI0ZDk4M2E5ZGEzYjVkN2RkOWFmMmQzYWFlNTZjOWNmYjg1YmE1MDk5MmRkNjlhYTI0Nzc4MzYzMWFkOTAxMTVmIn0%3D; laravel_session=eyJpdiI6IkNWRXhjY2FuZ3g1MTBqYS9XdGRmNWc9PSIsInZhbHVlIjoiMXJYQzR6dmJYTEl3S25NVUdZcVlNZEVMcW0xVHh2VGo3bm5seFowSjhqQjFGeGNaRzZ4a0Rsb1RXT2JGdXlDUzFtVzVVWXFDWWxpWG1SdUVPY3pudStYcXI3eEtSSUtNZG1UK1lNODNSd3Y1WWx1eVFNWDl3WHBTN3g5NXJrOGciLCJtYWMiOiI2NjljYjg1ZTVmYTAzOTczYTExYzMyNTdjYmY0NGM5MjgyNTFlMjNkOGIxMjFjYzE3ZDAzM2JkOTg2ZTQ4M2Q1In0%3D; z5lnd1rbDuQmEC5E0mEfAdZU2qTcbiaYY3roAlQJ=eyJpdiI6ImVxQW1DWDFqcHRyRXhqMFVkbHc5TkE9PSIsInZhbHVlIjoicEc3QmVNT3cvQnJaNElBUHI1dEVDRUdneDllVTVNQ0loRndHU2VrLysvNmtxbVRXMWtSTWNGam5sZ0wvb3VTWGVudkdXQjhwd1Z1bG5lalQ0T2xNQnU2MGRWcVUveVRVQ2EyNzZVV2lJU0plWmNJS3VNaU9YbFJTZGg2ZThteUM2Z3RZdC9XTFZVc1dXa0VPYkFMSEc4VUVONTRHWTI2Z1RESnBxNjJ1Y2t1RFIzU2pxeHlYSEVDSUhBQUgybXVDcTlydmN1ZmhlTWVQVVdsVDV3L0FsOVFzc3F0ZmZKd3Y3NnR6UDBoMmhDbDBmVk1lY0pNNmFXbFc4Ty9IcmZ2TWtldnloekE3ZnQ5SVdXRjdoOTMyN2x6VGtsQ0JMcUVWbXJPbEdMQ2pWWEVRN2ZqOHFZOGMzdVVKeVVIN1U4c0V5b3M1c2FOZ1BCSlpjdk9wdHlpaFRYdk9ncGY2YTVTSkVRSHhrRWhzNklyQXA4TnhBRFNsTnVuQkVnYUlVL0J1SWFlZGNQS1RPVkkwNFFCRitzUUNYdz09IiwibWFjIjoiZjIwYmYzODVlNzQ3NTU5NTIyZjMyMDU0MDcxM2E2Y2FiMzZlYTc2YWNiY2NhZjQzZDU0MWVlZDRlNzM5YzRlMCJ9",
//         Referer: "https://reunexa.com/register",
//         "Referrer-Policy": "strict-origin-when-cross-origin",
//       },
//     }
//   )
//   .then((res) => {
//     require("fs").writeFileSync("rexuna.html", res.data);
//   });
const registerActivate = async (cookie) => {
  const { data } = await axios.get("https://reunexa.com/register", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-GB,en;q=0.9",
      "cache-control": "max-age=0",
      "sec-ch-ua":
        '"Microsoft Edge";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie: cookie,
      Referer: "https://reunexa.com/register",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
  require("fs").writeFileSync("registerActivate.html", data);
};
