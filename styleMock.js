module.exports = new Proxy({}, {
    get: (target, name) => name
  });
  