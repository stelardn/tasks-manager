import http from 'node:http';

import { randomUUID as random } from 'node:crypto'

import { Database } from '../database/index.js';
import { reqBodyToJson } from './middlewares/reqBodyToJson.js';
const database = new Database();

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await reqBodyToJson(req, res);

    if(url === '/tasks' && method === 'POST') {
        const { title, description } = req.body;

        const newTask = {
            title,
            description,
            id: random(),
            created_at: new Date(),
            updated_at: null,
            completed_at: null
        }

        database.insert('tasks', newTask);

        res.end();
    }

    if(url === '/tasks' && method === 'GET') {
        const data = database.select('tasks');

        res.end(JSON.stringify(data));
    }

    res.end();

})

server.listen(3333, () => {
    console.log('Server running.');
});
