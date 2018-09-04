const Bundler = require('parcel-bundler');
const typedCSSModules = require('../src/index');
const path = require('path');

async function main() {
  const bundler = new Bundler(path.join(__dirname, 'test-data', 'index.js'), {
    watch: false,
    cache: false,
    hmr: false,
    logLevel: 4,
    outDir: path.join(__dirname, 'dist'),
  });
  typedCSSModules(bundler);
  await bundler.bundle();

}

main().catch(console.error);
