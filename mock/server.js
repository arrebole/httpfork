import { createServer, IncomingMessage, ServerResponse } from 'http';
import config from '../config/config.json' assert { type: "json" };

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

for (const item of config.outbounds) {
    createServer(createRequestListener(item.port)).listen(item.port, "0.0.0.0");
}
