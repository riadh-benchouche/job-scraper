import path from "path";
import fs from "fs";
import xlsx from "xlsx";
import {Job} from "../types/Job";

export async function saveJobsToExcel(jobs: Job[]) {
    const filePath = path.join(__dirname, '../data/jobs.xlsx'); // Path to the Excel file
    let workbook;

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        workbook = xlsx.readFile(filePath); // Read the existing file
    } else {
        workbook = xlsx.utils.book_new(); // Create a new file
    }

    // Check if the "Jobs" sheet already exists
    const sheetName = 'Jobs';
    const existingData: Job[] = workbook.Sheets[sheetName] ? xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]) : [];

    // Create a set of existing company names for quick lookup
    const existingCompanies = new Set(existingData.map(job => job.company));

    // Filter jobs to avoid duplicates
    const uniqueJobs = jobs.filter(job => !existingCompanies.has(job.company));

    // Convert unique data to a worksheet
    const worksheet = xlsx.utils.json_to_sheet(uniqueJobs);

    // Add the worksheet
    if (uniqueJobs.length > 0) {
        if (workbook.Sheets[sheetName]) {
            // Add new data to the existing sheet
            const newWorksheet = xlsx.utils.json_to_sheet(existingData.concat(uniqueJobs));
            workbook.Sheets[sheetName] = newWorksheet; // Replace the old sheet
        } else {
            // Otherwise, add the new sheet
            xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
        }
    } else {
        console.log('No new jobs to add.');
    }

    // Write the Excel file
    xlsx.writeFile(workbook, filePath);
    console.log(`Jobs saved to ${filePath}`);
}