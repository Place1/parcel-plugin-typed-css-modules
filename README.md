# Parcel Plugin Typed CSS Modules

[npm package](https://www.npmjs.com/package/parcel-plugin-typed-css-modules)

[typed-css-modules](https://github.com/Quramy/typed-css-modules)

## Installation
All you need to do is install the npm package 😀

```
npm install parcel-plugin-typed-css-modules
```

## How does it work?
After installing the plugin, parcel will generate `.d.ts` files next to any `.css` or
`.scss` files that are imported by your app.

e.g.

```
app
├── index.ts
├── css-example.css
└── css-example.css.d.ts <-- created by parcel-plugin-typed-css-modules
```

the contents of `css-example.css` look like this:
```css
.myClass {
  display: block;
}
.another-class {
  display: block;
}
```

and the resulting declaration file looks like this:

```typescript
export const myClass: string;
export const anotherClass: string;
```

Now the typescript compiler can warn you about unknown/unused CSS classes:

```typescript
import { myClass, anotherClass, oopsClass } from './css-example.css'; // <-- compilation error: oopsClass is not exported!
```

### Support for CSS Modules (i.e., scoped/localized/mangled class names)

[CSS modules](https://github.com/css-modules/css-modules) are supported.

If Parcel is [configured to use PostCSS](https://en.parceljs.org/transforms.html#postcss) and CSS modules are enabled
(e.g., the `.postcssrc` file contains `modules: true`), the contents of `css-example.css` will look like this:

```css
._myClass_1npel_2 {
  display: block;
}
._another-class_1npel_6 {
  display: block;
}
```

The generated `css-example.css.d.ts` file will still contain the "plain" variable names so that you can continue to
reference them as you'd expect in your application:

```typescript
export const myClass: string;
export const anotherClass: string;
```
