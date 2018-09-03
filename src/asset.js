const CSSAsset = require('parcel-bundler/src/assets/CSSAsset');
const DtsCreator = require('typed-css-modules');

module.exports = class TypedCSSModules extends CSSAsset {

  constructor(name, options) {
    super(name, options);
    this.creator = new DtsCreator({
      camelCase: true
    });
  }

  async generate() {
    const generated = await super.generate();
    for (const asset of generated) {
      if (asset.type === 'css') {
        let cssFileContents = asset.value;

        // If Parcel is configured to use CSS modules (e.g., via .postcssrc file), the postcss-modules transformer will
        // add a "cssModules" property to the "asset" object. This object maps the CSS class names to their "scoped"
        // (i.e., mangled to be unique) versions that appear in the CSS content. For more info see 
        // https://en.parceljs.org/transforms.html#postcss and https://github.com/css-modules/postcss-modules.
        if(asset.cssModules) {
          // Replace the scoped/mangled class names with the original versions. This way the CSS we end up passing to
          // DtsCreator will have regular class names, resulting in *.css.d.ts files that have regular variable names.
          cssFileContents = Object.entries(asset.cssModules).reduce(searchReplaceReducer, cssFileContents);
        }

        const dtsContent = await this.creator.create(this.name, cssFileContents);
        await dtsContent.writeFile();
      }
    }
    return generated;
  }
}

function searchReplaceReducer(cssFileContents, [originalCssClass, scopedCssClass]) {
  return cssFileContents.replace(new RegExp(escapeRegExp(scopedCssClass), 'g'), originalCssClass);
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}