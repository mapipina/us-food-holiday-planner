module.exports = async () => {
  if (global.fetch === undefined) {
    const { fetch, Request, Response, Headers } = require('node-fetch');
    global.fetch = fetch;
    global.Request = Request;
    global.Response = Response;
    global.Headers = Headers;
  }
};
