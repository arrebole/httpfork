# httpfork
> 将 `http` 转发到多个服务器

### 配置
```json
{
    "host": "127.0.0.1",
    "port": "80",
    "outbounds": [
        {
            "host": "sample-1",
            "port": 8080,
            "protocol": "http"
        },
        {
            "host": "sample-2",
            "port": 8080,
            "protocol": "http"
        }
    ]
}
```
