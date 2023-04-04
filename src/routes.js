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

            const result = database.delete('tasks', {id})

            if(result) {
                res.end()
            } else {
                res.writeHead(200).end('Não foram encontrados registros.')
            }
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
        
            const result = database.update('tasks', {id}, newData)

            if(result) {
                res.end()
            } else {
                res.writeHead(200).end('Não foram encontrados registros.')
            }
        
        }
    },
    {
        url: buildRoutePath('/tasks/:id/complete'),
        method: 'PATCH',
        action: async (req, res) => {
            const id = req.params.id;

            const newData = {
                completed_at: new Date(),
            }
        
            const result = database.update('tasks', {id}, newData)
        
            if(result) {
                res.end()
            } else {
                res.writeHead(200).end('Não foram encontrados registros.')
            }

        }
    }
]