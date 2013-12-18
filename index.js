var fs = require('fs');
var useragentParser = require('useragent_parser');

var supportedBrowsers = {
  'Chrome': 13,
  'Firefox': 4,
  'IE': 10,
  'Opera': 15,
  'Safari': 5
};

var browserIcons = ['Chrome', 'Firefox', 'Opera'];
var iconFiles = {};
for (var i = 0; i < browserIcons.length; i++) {
  var imageUrl = '/browser/' + browserIcons[i] + '.png'
  iconFiles[imageUrl] = fs.readFileSync(__dirname + '/img/' + browserIcons[i] + '.png');
}

module.exports = function (options) {
  options = options || {};

  if (options.browsers) {
    supportedBrowsers = options.browsers;
  }


  function middleware(req, res, next) {
    if (req.url === '/browser') {
      res.setHeader('Content-Type', 'text/html');
      var template = fs.readFileSync(__dirname + '/index.html');
      return res.end(template);
    }

    if (iconFiles[req.url]) {
      res.setHeader('Content-Type', 'image/png');
      return res.end(iconFiles[req.url]);
    }

    var useragent = req.headers['user-agent'];
    if (useragent) {
      var browser = useragentParser.parse(useragent);
      var supportedVersion = supportedBrowsers[browser.family];

      if (!supportedVersion || browser.v1 < supportedVersion) {
        return res.redirect('/browser');
      }
    }

    next();
  }

  return middleware;
}