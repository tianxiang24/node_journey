# 构建 Web 应用

## 基础功能

1. 如何解析报文得到方法，url params，路径？
2. cookie 的用途与劣势？
3. session 为何需要与 cookie 搭配？面临安全问题时如何处理？签名 cookie 一定安全吗?
4. Basic 认证指的是？

### Method

通过 `http-parser` 解析得到，`req.method`

### Path

常见场景：根据路径进行业务处理的应用——静态文件服务器 及 根据路径选择控制器，它预设路径为控制器和行为的组合。

```js
function (req, res) {
    const pathname = url.parse(req.url).pathname
    fs.readFile(__dirname + pathname, (err, file) {
        if(err) {return}
        res.writeHead(200);
        res.end(file)
    })
}
```

```js
/controller/action/a/b/c
```
### 查询字符串
```js
function (req, res) {
    const query = url.parse(req.url).query
}
```
### Cookie
1. 有哪些属性？
2. Secure 在什么场景下起作用？
3. SameSite 各个值在什么场景下有效？各个浏览器默认值一致吗？什么情况下可以防范 CSRF 攻击？
4. Domain 设置为顶级域名有何影响？顶级域名是指什么？一般情况下哪一部分是顶级域名？有效顶级域名是指？
5. Path 可以设置其他域名吗？只能是相对路径吗？会影响对跨域的判断吗？
6. 什么情况下需要设置 `allowCredentials`？不设置有什么影响？
7. `Access-Control-Allow-Methods` 什么情况下设置为 `*` 时无效？无效时 `*` 指代什么？
8. `Access-Control-Allow-Origin` 可以不设置为**整个域名**吗？ 设置为 `*` 有何效果？
9. 会话型 cookie 是在什么条件下产生的？
10. 在 express 中，Max-Age 和 Expires 是什么关系？如何产生的？
11. cookie 如何设置签名，有什么效果？一定安全吗？

### Session
1. Session 存储在客户端还是服务端？
2. 用 Redis 之类的缓存好还是存在服务端运行内存中好？
3. 有何缺陷？如何解决？
4. 有没有什么安全问题？如何确保安全？
5. `express-session` 如何实现的？
6. 可以放在 cookie 中带到后端吗？放在 header 中呢？
7. 跟 token 有何区别？
