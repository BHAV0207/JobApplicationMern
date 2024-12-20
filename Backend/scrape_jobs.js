const puppeteer = require("puppeteer");
const axios = require("axios");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const diceURL =
    "https://www.dice.com/jobs?q=Software&radius=30&radiusUnit=mi&page=1&pageSize=20&filters.postedDate=ONE&filters.workplaceTypes=Remote&filters.employmentType=CONTRACTS&currencyCode=USD&language=en";
  await page.goto(diceURL, { waitUntil: "domcontentloaded" });

  // Wait for job cards to load
  await page.waitForSelector(".card-title-link", { timeout: 10000 });

  // Scrape job data
  const jobs = await page.evaluate(() => {
    const jobCards = Array.from(document.querySelectorAll(".card-content"));

    return jobCards.map((job) => ({
      title:
        job.querySelector(".card-title-link")?.innerText || "Unknown Title",
      company:
        job.querySelector(".company-name")?.innerText || "Unknown Company",
      location: job.querySelector(".job-location")?.innerText || "Unknown Location",
      postedDate:
        job.querySelector(".posted")?.innerText || "Unknown Date",
      employmentType:
        job.querySelector(".employment-type")?.innerText || "Unknown Type",
      description:
        job.querySelector(".description")?.innerText ||
        "No description available",
      url: job.querySelector(".card-title-link")?.href || "No URL available",
    }));
  });

  console.log(`Scraped ${jobs.length} jobs.`);

  for (const job of jobs) {
    try {
      const parsedDate = new Date(job.postedDate); // Convert string to Date
      if (isNaN(parsedDate)) {
        console.warn(
          `Invalid date for job: ${job.title}, skipping date conversion.`
        );
      } else {
        job.postedDate = parsedDate; // Replace string with Date object
      }

      // Send the job to the backend
      const response = await axios.post("http://localhost:3000/api/jobs", {
        title: job.title,
        company: job.company,
        location: job.location,
        postedDate: job.postedDate,
        employmentType: job.employmentType,
        description: job.description,
        url: job.url,
      });

      console.log(`Job sent: ${response.status} - ${response.statusText}`);
    } catch (error) {
      console.error(`Failed to send job: ${error.message}`);
    }
  }

  await browser.close();
})();
