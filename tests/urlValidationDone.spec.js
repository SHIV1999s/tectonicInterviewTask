const fs = require('fs'); // Import the fs module to write to files
const { test, expect } = require('@playwright/test');
const Urls = ["https://store.includ.com/", "https://store.ohosgo.com"]
const linkStatuses = [];
test('verifying the HTTP status of all navigation links', async ({ page }) => {
  for (const eachUrls of Urls) {
  try {
    const response = await page.request.get(eachUrls);  // Attempt to make the GET request
    console.log(`Status for ${eachUrls}: ${response.status()}`);

    console.log(eachUrls);
    await page.goto(eachUrls);
    await page.waitForLoadState('networkidle');
    const linkElements = await page.locator('[href*="https"]').all();
    console.log(linkElements.length);
    const foundlinks = [];
    for (const element of linkElements) {
      const href = await element.getAttribute('href');
      if (href) foundlinks.push(href);
    }
    // console.log('Extracted Links:', foundlinks);
    for (const link of foundlinks) {
      const response = await page.request.get(link);
      linkStatuses.push({ url: link, status: response.status() });
    }
    // // Log the HTTP status of each link
    console.log('Link Statuses:', linkStatuses);
  } 
  catch (error) {
    console.error(`Error fetching ${eachUrls}:`, error.message);
    // Handle the error, e.g., log it or skip the current URL
  }}
  const outputPath = './result/alllinkStatuses.json'; // Define the file path
  fs.writeFileSync(outputPath, JSON.stringify(linkStatuses, null, 2)); // Write data to file
  console.log(`Results saved to ${outputPath}`);
});
