var Proxy = require('../node_modules/browsermob-proxy').Proxy;
var nightwatch = require('../node_modules/nightwatch')
// var command=require('../commands');
  
exports.setupProxy = function(nightwatch, callback) {
  var client = nightwatch.client;
      client = new Proxy({ host: 'localhost', port: 8080 });

  client.start(function(err, data) {
    // client.startH();
    var proxyPort = data.port,
        proxyUrl = 'localhost' + ':' +  proxyPort;
    client.desiredCapabilities={ proxy: { httpProxy: proxyUrl } };
    client.proxyPort = proxyPort;
    // console.log(client)
    // client.desiredCapabilities.proxy = { httpProxy: proxyUrl };
    // console.log(client);
    
    // callback(client);
    // return client;
    // client.startHAR();
    if (typeof callback === "function") {
      console.log('in function type');
      // callback;
      callback(client);
      // done();
    }
   callback(client);
  });
};