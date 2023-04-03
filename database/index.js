import { writeFile, readFile } from 'node:fs/promises';

export class Database {
    databaseFilePath = new URL('../db.json', import.meta.url);
    #database = {};

    constructor() {
        readFile(this.databaseFilePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                console.log('Criado arquivo.');
                this.#persist()
            })
    }

    #persist() {
        writeFile(this.databaseFilePath, JSON.stringify(this.#database))
    }

    insert(table, data) {
        if(this.#database[table]) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }


        return this.#persist()        

    }

    select(table) {
        return this.#database[table]
    }

    update(table, filter, data) {

    }

    delete(table, filter) {
        const rowToDelete = this.#database[table].findIndex(row => row[Object.keys(filter)[0]] === filter[Object.keys(filter)[0]]);

        // console.log(row[Object.keys(filter)[0]]);
        console.log(rowToDelete);
        
        if(rowToDelete >= 0) {
            this.#database[table].splice(rowToDelete, 1);
        }

        this.#persist();
    }
}