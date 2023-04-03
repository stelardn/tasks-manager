import { randomUUID as random } from 'node:crypto'

import { Database } from '../database/index.js';
import { buildRoutePath } from './utils/buildRoutePath.js';
const database = new Database();

export const routes = [
    {
        url: buildRoutePath('/tasks'),
        method: 'GET',
        action: async (req, res) => {
            const data = database.select('tasks');

            res.end(JSON.stringify(data));
        }
    }, 
    {
        url: buildRoutePath('/tasks'),
        method: 'POST',
        action: async (req, res) => {
            const { title, description } = req.body;

            if(!title || !description) {
                res.writeHead(422).end('Informe nome e descrição.')
            }
        
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
    },
    {
        url: buildRoutePath('/tasks/:id'),
        method: 'DELETE',
        action: async (req, res) => {
            const id = req.params.id;

            database.delete('tasks', {id})
        }
    },
    {
        url: buildRoutePath('/tasks/:id'),
        method: 'PUT',
        action: async (req, res) => {
            const id = req.params.id;

            const { title, description } = req.body;
        
            const newData = {
                title,
                description,
                updated_at: new Date(),
                completed_at: null
            }
        
            database.update('tasks', {id}, newData)
        
            res.end();

        }
    }
]