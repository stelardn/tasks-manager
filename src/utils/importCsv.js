import { parse } from 'csv-parse';
import { createReadStream } from 'node:fs';

const csvFilePath = new URL('../../uploads/tasks.csv', import.meta.url);

const csvParse = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2 // skip the header line
  });

const url = 'http://localhost:3333/tasks';


const records = createReadStream(csvFilePath, 'utf-8').pipe(csvParse);

export async function createTasksFromCsv() {
    let counter = 1;

    for await (const line of records) {
        const [name, description] = line;
        
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({ name, description }),
            headers: { "Content-Type": "application/json" },
        });

        console.log('Task created', counter++);
    }
}

