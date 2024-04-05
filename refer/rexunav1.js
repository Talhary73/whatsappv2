const puppeteer = require("puppeteer");
function generateRandomNumber() {
  // Generate a random number between 100,000,000 and 999,999,999
  const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
  return randomNumber;
}
(async () => {
  // Launch browser
  const code = "code";
  const url = "https://reunexa.com/register";
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.screenshot({ path: "screenshot.png" });
  // Wait for the page to reload

  // Type text into the input field with class "form-control"
  await page.type(
    `input.form-control[name="firstname"]`,
    `talha` + generateRandomNumber()
  );
  await page.type(
    `input.form-control[name="email"]`,
    `talha` + generateRandomNumber() + "@gmail.com"
  );
  await page.screenshot({ path: "screenshot.png" });
  page.cookies().then((cookies) => {
    console.log(cookies);
  });
  // Example: Type something into the input field
  await page.type(
    `input.form-control[name="mobile"][placeholder="Enter active mobile number"]`,
    "3" + generateRandomNumber()
  );

  const password = generateRandomNumber();
  await page.type(`input.form-control[name="password"]`, password);
  await page.type(`input.form-control[name="password_confirmation"]`, password);
  await page.type(`input.form-control[name="referBy"]`, code);
  await page.screenshot({ path: "screenshot.png" });

  await page.click("button");
  await page.screenshot({ path: "screenshot.png" });
  // Close the browser
  await browser.close();
})();
