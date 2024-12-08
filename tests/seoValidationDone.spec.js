const fs = require('fs'); // Import the fs module to write to files
const { test} = require('@playwright/test');
const Urls = ["https://store.includ.com/", "https://store.ohosgo.com"]
const pagesWithSEO = [];
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
      const foundlinks = [eachUrls];
      for (const element of linkElements) {
        const href = await element.getAttribute('href');
        if (href) foundlinks.push(href);
      }
      // console.log('Extracted Links:', foundlinks);
      for (const link of foundlinks) {
        await page.goto(link);
        // const seoTags= await page.locator('script[type="application/ld+json"]').allInnerTexts();
        // console.log(link,"=/n",seoTags);
        if (await page.locator('script[type="application/ld+json"]').count() > 0) {
          console.log(`Page with SEO tags: ${link}`);
          pagesWithSEO.push(link);  // Add URL to the list of pages with SEO tags
      } else {
          console.log(`Page without SEO tags: ${link}`);
      }
      
      }
      console.log(pagesWithSEO);
      
    }
    catch (error) {
      console.error(`Error fetching ${eachUrls}:`, error.message);
      // Handle the error, e.g., log it or skip the current URL
    }
  }
  const outputPath = './result/pagesWithSEO.json'; // Define the file path
  fs.writeFileSync(outputPath, JSON.stringify(pagesWithSEO, null, 2)); // Write data to file
  console.log(`Results saved to ${outputPath}`);
});



