# joi-browser

joi validation bundled for the browser

## Why?

There has been some difficulty in getting a reasonable version of Joi packaged for the browser both due to the size of bundling and now with 7.x.x the switch to ES6 modules has added additional challenges.

The community is trying to rally to get the Joi package itself setup so that we can generate bundles directly from it, but until this is done, this package will allow you to build a bundled version.

This package can be used included in other builds (browserify or webpack) or used on its own.

The default version exposed by package.json is the unminified bundle. Since I expected to primarily be using this inside of another bundle. However the minified version is also built on install as dist/bundle.min.js.

## Usage


```bash
# install latest master
npm install jeffbski/joi-browser

# OR using a specific tag
npm install jeffbski/joi-browser#v7.0.1
```
