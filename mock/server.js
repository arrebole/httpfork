import { createServer, IncomingMessage, ServerResponse } from 'http';

function createRequestListener(port) {
    /**
     * @param {IncomingMessage} clientReq 
     * @param {ServerResponse} clientRes 
     */
    return async (clientReq, clientRes) => {
        const info = `[request in ${port}] ${clientReq.method} ${clientReq.url}`;
        console.log(info);
        clientRes.write(info);
        clientRes.end();
    }
}

createServer(createRequestListener(8080)).listen(8080, "0.0.0.0");
createServer(createRequestListener(8081)).listen(8081, "0.0.0.0");
