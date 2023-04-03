import http from 'node:http';

import { reqBodyToJson } from './middlewares/reqBodyToJson.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extractQueryParams.js';

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await reqBodyToJson(req, res);

    const currentRoute = routes.find(route => route.url.test(url) && route.method === method);

    if(currentRoute) {
        const queryAndRouteParams = req.url.match(currentRoute.url)

        const { query, ...params } = queryAndRouteParams.groups

        req.query = query ? extractQueryParams(query) : {}
        req.params = params
        
        await currentRoute.action(req, res)
    } else {
        res.writeHead(404).end()
    }

    res.end();

})

server.listen(3333, () => {
    console.log('Server running.');
});
