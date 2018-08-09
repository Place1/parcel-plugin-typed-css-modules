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
        const content = await this.creator.create(this.name, asset.value);
        await content.writeFile();
      }
    }
    return generated;
  }
}
