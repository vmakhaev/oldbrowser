# Old Browser

Ask users to upgrade old browser

![alt tag](https://raw.github.com/vmakhaev/browser/master/img/screenshot.png)

- Connect Middleware
- Old browsers are redirected to "Your browser too old :(" page
- Configurable
- Inspired by [Ruby-browser](https://github.com/fnando/browser)

## Known Issues
- No support for minor browser versions
- All requests without user agent are just allowed

### Installation
```
npm install oldbrowser
```

### Sample
```
var oldbrowser = require('oldbrowser');

...
  // Connect middleware
  .use(oldbrowser())
```
### Defaults are:
```
var supportedBrowsers = {
  'Chrome': 13,
  'Firefox': 4,
  'IE': 10,
  'Opera': 15,
  'Safari': 5
};
```

### If you want to overwrite:
```
var options = {
  browsers: {
    'IE': 6 // It means that only IE >= 6 are allowed. All other browsers are denied
  }
};

...
  // Connect middleware
  .use(oldbrowser(options))
```