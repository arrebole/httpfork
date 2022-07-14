import { createServer, request } from 'http';
import config from '../config/config.json' assert { type: "json" };

function log(text) {
  console.log(
    `\x1B[31m[${new Date().toISOString()}]\x1B[34m ${text}`,
  );
}

const app = createServer(async (clientReq, clientRes) => {

  log(
    `[IN] ${clientReq.method} ${clientReq.url}`
  );

  for (const outbound of config.outbounds) {
    const options = {
      hostname: outbound.host,
      port: outbound.port,
      path: clientReq.url,
      method: clientReq.method,
      headers: clientReq.headers,
    }
    const proxy = request(options, function (res) {
      log(
        `[PROXY] ${clientReq.method} ${clientReq.url} ${outbound.host}:${outbound.port}`,
      );

      // 将转发后的结果返回给客户端
      if (outbound.through) {
        clientRes.writeHead(res.statusCode, res.headers);
        res.pipe(clientRes, { end: true });
      }
    });

    try {
      clientReq.pipe(proxy, { end: true });
    } catch (e) {
      clientRes.statusCode = 500;
      clientRes.end("服务器错误");
    }
  }
});

app.listen(config.port, config.host, () => {
  console.log(`Server running on port ${config.port}`);
});
