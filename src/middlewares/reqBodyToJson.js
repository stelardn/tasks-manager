export async function reqBodyToJson(req, res) {
    const bodyBuffers = [];
    
    for await (const chunk of req) {
        bodyBuffers.push(chunk);
    }
    
    try {
        req.body = JSON.parse(Buffer.concat(bodyBuffers).toString())
    } catch {
        req.body = {}
    } finally {
        res.setHeader('Content-type', 'application/json')  
    }
}