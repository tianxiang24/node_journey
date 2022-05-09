const { merge } = require("./utils");
const { parse } = require("url");
const finalHandler = require("finalhandler");
const EventEmitter = require("events").EventEmitter;
const http = require("http");

let proto = {};
let env = process.env

function connect() {
  function app(req, res, next) {
    app.handle(req, res, next);
  }

  merge(app, proto);
  merge(app, EventEmitter.prototype);
  // why
  app.route = "/";
  app.stack = [];

  return app;
}

proto.use = function (route, fn) {
  let handle = fn;
  let path = route;

  if (typeof route !== "string") {
    handle = route;
    path = "/";
  }

  if (path[path.length - 1] === "/") {
    path = path.slice(0, -1);
  }

  this.stack.push({ route: path, handle });

  return this;
};

/**
 * Why we use out as third parameters
 */
proto.handle = function handle(req, res, out) {
  let index = 0;
  let protohost = getProtohost(req.url) || ''
  let removed = "";
  let slashAdded = false;
  let stack = this.stack;

  let done =
    out ||
    finalHandler(req, res, {
      env,
      onerror: console.error,
    });

  req.originalUrl = req.originalUrl || req.url;

  function next(err) {
    if (slashAdded) {
      req.url = req.url.substr(1);
      slashAdded = false;
    }

    // what's removed?
    if (removed.length !== 0) {
      req.url = protohost + removed + req.url.substr(protohost.length);
      removed = "";
    }

    let layer = stack[index++];

    if (!layer) {
      setImmediate(done, err);
      return;
    }

    let path = parse(req.url).pathname || "/";
    let route = layer.route;

    if (path.toLowerCase().substr(0, route.length) !== route.toLowerCase()) {
      return next(err);
    }

    let c = path.length > route.length && path[route.length];
    if (c && c !== "/" && c !== ".") {
      return next(err);
    }

    if (route.length !== 0 && route !== "/") {
      removed = route;
      req.url = protohost + req.url.substr(protohost.length + removed.length);

      if (!protohost && req.url[0] !== "/") {
        req.url = "/" + req.url;
        slashAdded = true;
      }
    }
    call(layer.handle, route, err, req, res, next);
  }
  next();
};

proto.listen = function () {
  const server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

module.exports = connect;

function getProtohost(url) {
  if (url.length === 0 || url[0] === '/') {
    return undefined;
  }

  var fqdnIndex = url.indexOf('://')

  return fqdnIndex !== -1 && url.lastIndexOf('?', fqdnIndex) === -1
    ? url.substr(0, url.indexOf('/', 3 + fqdnIndex))
    : undefined;
}

function call(handle, route, err, req, res, next) {
  var arity = handle.length;
  var error = err;
  var hasError = Boolean(err);


  try {
    if (hasError && arity === 4) {
      // error-handling middleware
      handle(err, req, res, next);
      return;
    } else if (!hasError && arity < 4) {
      // request-handling middleware
      handle(req, res, next);
      return;
    }
  } catch (e) {
    // replace the error
    error = e;
  }

  // continue
  next(error);
}