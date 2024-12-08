const fs = require('fs'); // Import the fs module to write to files
const { test, expect } = require('@playwright/test');
const Urls = ["https://store.includ.com/", "https://store.ohosgo.com"]
const imagesWithoutAlt = [];
test('verifying the HTTP status of all navigation links', async ({ page }) => {
  for (const eachUrls of Urls) {
    try {
      const response = await page.request.get(eachUrls);  // Attempt to make the GET request
      console.log(`Status for ${eachUrls}: ${response.status()}`);
      console.log("Parent Url", eachUrls);
      await page.goto(eachUrls);
      await page.waitForLoadState('networkidle');
      const linkElements = await page.locator('[href*="https"]').all();
      console.log(linkElements.length);
      const foundlinks = [eachUrls];
      for (const element of linkElements) {
        const href = await element.getAttribute('href');
        if (href) foundlinks.push(href);
      }
      // console.log('Extracted Links:', foundlinks);

      for (const link of foundlinks) {
        console.log("Child URL", link);
        await page.goto(link);
        await page.waitForLoadState('load');  // Wait for the page to load fully
        const images = await page.locator('img').all();
        for (const image of images) {
          const imgUrl = await image.getAttribute('src');  // Get the image URL
          const altText = await image.getAttribute('alt'); // Get the alt text
          // If alt attribute is missing or empty, log the image URL and page URL
          if ((!altText) && (imgUrl != null)) {
            // console.log(`Image without alt text: ${imgUrl}`,"====",`Page URL: ${link}`);
            imagesWithoutAlt.push({ imgUrl, pageUrl: link });  // Store the result
          } else {
            // console.log(`Image with alt text: ${imgUrl}`,"====",`Page URL: ${link}`);
          }
        }
      }
      // Output all the images without alt text
      console.log('Images without alt text:', imagesWithoutAlt);
    }
    catch (error) {
      console.error(`Error fetching ${eachUrls}:`, error.message);
      // Handle the error, e.g., log it or skip the current URL
    }
  }
  const outputPath = './result/imagesWithoutAlt.json'; // Define the file path
  fs.writeFileSync(outputPath, JSON.stringify(imagesWithoutAlt, null, 2)); // Write data to file
  console.log(`Results saved to ${outputPath}`);
});
