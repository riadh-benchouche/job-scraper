import readline from 'readline';
import {saveJobsToExcel} from "./utils/saveJobsToExcel";
import {scrapeJobs} from "./utils/scrapeJobs";

// Function to read the base URL from the terminal
function getBaseUrl(): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question('Please enter the base URL for scraping: ', (url) => {
            rl.close();
            resolve(url.trim()); // Remove unnecessary spaces
        });
    });
}

// Start the request for the base URL
getBaseUrl()
    .then(baseUrl => {
        // Start scraping
        return scrapeJobs(baseUrl);
    })
    .then(jobs => {
        console.log('Scraped Jobs:', JSON.stringify(jobs, null, 2));
        return saveJobsToExcel(jobs);
    })
    .catch(err => console.error(err));
