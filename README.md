# joi-browser

joi object schema validation bundled for the browser (babelified and bundled)

## Why?

There has been some difficulty in getting a reasonable version of Joi packaged for the browser both due to the size of bundling and now with 7.x.x the switch to ES6 modules has added additional challenges.

The community is trying to rally to get the Joi package itself setup so that we can generate bundles directly from it, but until this is done, this package will allow you to build a bundled version.

This package can be used included in other builds (browserify or webpack) or used on its own.

The default version exposed by package.json is the babelified unminified bundle. It has been transpiled to ES5. Since I expected to primarily be using this inside of another bundle. However the minified version is also built on install as dist/bundle.min.js.

## Usage


```bash
npm install moment # peer dependency used by joi-browser
npm install joi-browser
```

```javascript
var Joi = require('joi-browser');
```

Note: if you are using webpack with a babel loader you may need to exclude `joi-browser` from being run through babel again.

In your webpack.config.js loaders, add an `exclude: [ /joi-browser/ ]`


### Isomorphic / Universal JS - using in browser and on server (Node.js)

If you want to use `joi` with Node.js and `joi-browser` for browser use then you can follow one of these recipies.

#### Browserify

```bash
npm install moment # peer dependency used by joi-browser
npm install joi-browser
npm install joi
```

Add the following to your app's package.json which will tell browserify to use joi-browser instead of joi when bundling for the browser.

```json
  "browser": {
    "joi": "joi-browser"
  },
```

So in your code, you just require `joi` and browserify will automatically switch it with joi-browser when it bundles.

```javascript
var Joi = require('joi');
```

#### Webpack

```bash
npm install moment # peer dependency used by joi-browser
npm install joi-browser
npm install joi
```

Add the following to your app's package.json which will tell webpack to use joi-browser instead of joi when bundling for the browser.

```json
  "browser": {
    "joi": "joi-browser"
  },
```

Add the following to your app's webpack.config.js to enable the package aliasing we configured in package.json

```javascript
  resolve: {
    packageAlias: 'browser'
  }
```

Note: if you are using webpack with a babel loader you may need to exclude `joi-browser` from being run through babel again.

In your webpack.config.js loaders, add an `exclude: [ /joi-browser/ ]`.



So in your code, you just require `joi` and webpack will automatically switch it with joi-browser when it bundles.

```javascript
var Joi = require('joi');
```


## Development

```bash
# builds dist/joi-browser.js and dist/joi-browser.min.js
npm install
```

Note: Moment has been excluded from the build, so you will want to include it into your project as `moment` to use `joi-browser`. This allows you to use your existing instance of moment rather than duplicating and allows you freedom to install locales and possibly even exclude moment with a shim if you don't use joi date validation features.

FYI: Moment's locale feature can result in a large bundle, so you can reduce the size of moment by excluding that with a webpack config containing something like:

```javascript
  plugins: [
    // english locale is included, exclude the rest
    new webpack.IgnorePlugin(/locale/, /moment$/)
  ],
```

Resulting size of joi-browser.min.js gzipped is 32KB.

## Upgrade notes

 - 7.1.0 - excludes `moment` from the `joi-browser` bundle, so it must be imported into your project from elsewhere. Bundle was renamed to `dist/joi-browser.js` and `dist/joi-browser.min.js`

## Discussion

The main discussion about these difficulties has been in this github issue.

https://github.com/hapijs/joi/issues/528#issuecomment-128532221

As for the bundling size issues that were summarized in the issue, the package size can be reduced by eliminating unnecessary code.

crypto is the first thing that can be safely eliminated since this functionaility in Joi would not be used by the browser. That is the biggest win dropping things to ~45KB gzipped without sacrificing any actual functionality.

If your use case doesn't require moment, isemail, and buffer, you can stub those packages out and get a bundle in the neighborhood of ~23KB gzipped.

I have chosen to make the default bundle only exclude crypto so that it would remain fully compatible, but you could fork this and create a smaller version by excluding things you don't need.

| Config | Joi and dependencies gzipped |
|----------|------------------------------------------|
| Full Joi | 126KB |
| w/o crypto (in Hoek) | 44KB |
| w/o crypto (in Hoek), moment | 31KB |
| w/o crypto (in Hoek), moment, isemail | 29KB |
| w/o crypto (in Hoek), moment, isemail, buffer | 23KB |
