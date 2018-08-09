# Parcel Plugin Typed CSS Modules

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
