const connect = require('./index')

const app = connect()

app.use(function (req, res) {
  res.end('hello, world!');
});

app.listen(3000)







