import { Builder } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
//import fs from "fs/promises";

const keyWord = "";

const main = async (req, res) => {
  // Configure Chrome options
  const chromeOptions = new Options();
  chromeOptions.headless();

  // Launch a new browser instance
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  const page = await driver.get("https://news.ycombinator.com/");

  const data = await driver.executeScript((keyWord) => {
    let $$news = [
      ...document.querySelectorAll(".athing")
    ].filter((elem) => elem.querySelector(".votearrow"));

    if (keyWord) {
      $$news = $$news.filter(($news) =>
        $news
          .querySelector(".titleline")
          .innerText.toLowerCase()
          .includes(keyWord)
      );
    }

    return $$news.map((elem) => {
      const $info = elem.nextElementSibling;

      return {
        title: elem.querySelector(".titleline").innerText,
        url: elem.querySelector(".titleline a").href,
        score: parseInt($info.querySelector(".score").innerText),
        date: $info.querySelector("span.age").title,
        by: $info.querySelector(".hnuser").innerText,
      };
    });
  }, keyWord);

  // Close the browser after scraping
  await driver.quit();

  const jsonData = JSON.stringify(data); // Convert the array to a JSON string

  res.send(jsonData);
  // try {
  //   await fs.writeFile("./public/data/scrapeData.json", jsonData);
  //   toast.success("Data stored in scrapeData.json"); // Show success toast
  // } catch (err) {
  //   console.error(err);
  //   toast.error("Error occurred while storing data"); // Show error toast
  // }
};

export default main;
