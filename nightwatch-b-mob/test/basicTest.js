var setup = require('../setUp/setupProxy');
var proxy = require('../node_modules/browsermob-proxy');
var startHAR = require('../commands/startHAR');
fs = require('fs');

module.exports = {
 beforeEach: function (self, cb) {
       setup.setupProxy(this, cb);
    },

  "Demo test Google" : function (browser) {
      browser.proxy.startHAR(browser.proxyPort, 'name', true, false, false, function cb(){
        browser.url("http://www.qa.shutterstock.com/subscribe");
        // browser.click("a[data-track='click.topNav.signIn']");
        browser.waitForElementVisible('body', 10000);
        browser.pause(20000, function (){
          browser.proxy.getHAR(browser.proxyPort, function(err, resp) {
            browser.proxy.stop(browser.proxyPort, function() {
              if (err) {
                cb(err);
              } else {
                fs.writeFileSync('xyz.har', resp, 'utf8');
                // console.log(resp);
                }
            });
        });
      });
    });
  }
};