import csv from 'csv-parser';
import fs from 'fs';
import { read } from 'xlsx';

const results = [];

function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

export function getDivisions(path) {
    return readCSV(`public/${path}/divisions.csv`);
}

export function getEvents(path) {
    return readCSV(`public/${path}/events.csv`);
}