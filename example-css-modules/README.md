# example-css-modules

This example shows how a `.postcssrc` file with `modules: true` can be used to generate CSS with scoped/localized
class names, but maintain the original (un-mangled) variables in the generated `*.css.d.ts` files.

1. Run Parcel to bundle the files: `node ./example-css-modules/index.js`
2. Run the example app (should print the original CSS class names names): `node ./example-css-modules/dist/index.js`
