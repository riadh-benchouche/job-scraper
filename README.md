# Job Scraper

This project is a web scraper built with Node.js using Puppeteer to extract job listings from Indeed. The scraped data
is saved in an Excel file (.xlsx) for further analysis.

## Features

- Scrapes job listings based on a given base URL.
- Saves job listings in an Excel file while avoiding duplicates.
- Supports pagination to scrape multiple pages of job listings.
- Allows for user input to specify the base URL for scraping.

## Technologies Used

- **Node.js**: JavaScript runtime for executing the scraper.
- **Puppeteer**: A Node library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol.
- **xlsx**: A library to read and write Excel files.
- **TypeScript**: A typed superset of JavaScript for improved development experience.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/riadh-benchouche/job-scraper.git
   cd job-scraper
    ```
2. Install the dependencies:
   ```bash
   pnpm install
   ```
3. Run the scraper:
   ```bash
   pnpm dev
    ```
4. The scraped data will be saved in a file named `jobs.xlsx`.

