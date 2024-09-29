import puppeteer, {Browser} from "puppeteer";
import {Job} from "../types/Job";

export async function scrapeJobs(baseUrl: string): Promise<Job[]> {
    const browser: Browser = await puppeteer.launch({headless: false});
    const jobs: Job[] = [];

    try {
        let currentPage = 0;
        let hasNextPage = true;

        while (hasNextPage) {
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(10000);

            // Generate the URL by adding the `start` parameter
            const url = `${baseUrl}&start=${currentPage}`;
            console.log(`Navigating to the page: ${url}`);
            await page.goto(url);
            console.log('Waiting for job elements...');
            await page.waitForSelector('li.css-5lfssm.eu4oa1w0');

            const pageJobs: Job[] = await page.evaluate(() => {
                const jobList: Job[] = [];
                const jobElements = document.querySelectorAll('li.css-5lfssm.eu4oa1w0');

                jobElements.forEach((job) => {
                    const titleElement = job.querySelector('h2.jobTitle') as HTMLElement;
                    const linkElement = job.querySelector('a.jcs-JobTitle') as HTMLAnchorElement;
                    const companyElement = job.querySelector('.css-63koeb') as HTMLElement;
                    const locationElement = job.querySelector('.css-1p0sjhy') as HTMLElement;

                    if (titleElement && linkElement && companyElement && locationElement) {
                        const title = titleElement.innerText;
                        const link = linkElement.href;
                        const company = companyElement.innerText;
                        const location = locationElement.innerText;

                        jobList.push({title, link, company, location});
                    }
                });

                return jobList;
            });

            jobs.push(...pageJobs); // Add job listings from the current page
            console.log(`Found ${pageJobs.length} jobs on page starting at ${currentPage}.`);

            // Check if there is a next page
            hasNextPage = await page.evaluate(() => {
                const nextPageButton = document.querySelector('a[data-testid="pagination-page-next"]');
                return nextPageButton !== null;
            });

            // Increment for the next page
            currentPage += 10;
            await page.close(); // Close the page after use
        }

        console.log(`Total jobs scraped: ${jobs.length}`);
        return jobs;
    } catch (error) {
        console.error('Error while scraping jobs:', error);
        return [];
    } finally {
        await browser.close();
    }
}
