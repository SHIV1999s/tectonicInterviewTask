Website Testing Tool
Overview
This tool verifies the following for websites:

Navigation URLs: Checks if all navigation links return valid HTTP status codes (no 404 errors).
SEO Tags: Verifies that all pages contain proper ld+json SEO tags.
Image Alt Text: Ensures all images have alt texts.
Tested websites:

https://store.includ.com/
https://store.ohosgo.com/
The tool generates 3 reports:

Navigation URLs and their status.
Pages with SEO tags.
Images without alt text.

Setup

git clone git@github.com:SHIV1999s/tectonicInterviewTask.git
cd tectonicInterviewTask

Install dependencies:

npm install
Run the tests:

to Run the test
npx playwright install

Output

The results are saved in the following JSON files:

alllinkStatuses.json: Contains Navigation URLs and their status.
pagesWithSEO.json: Contains URLs with SEO tags.
imagesWithoutAlt.json: Contains Images without alt text.

