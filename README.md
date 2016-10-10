# pullstashio

NOTE: Tested for privately hosted v3.6.# (aka Stash). Private BitBucket or BitBucket cloud is TBD or not done.

## Project setup
1. Create and register a pem key with Google Chrome App. Place in root of project as pullstashio.pem
2. Copy env-sample.js to env.js
3. Install local chrome extension as "Load unpacked extension..." pointing to src dir. Don't worry about errors.
4. Grab ID and use in env.js for dev version.
6. Reload extension.


## Build process
1. Update manifest.json with new build number (manually controlled right now)
2. Run `./bin/build.sh pullstashio` to get a dist/pullstashio-REV.zip
3. Upload dist/pullstashio-REV.zip to Chrom Apps.

## Alt build/project setup
Note: This will point developer loaded extension to a build. This will help verify src dir and build process are in sync.

1. Create and register a pem key with Google Chrome App. Place in root of project as pullstashio.pem
2. Copy src/env-sample.js to src/env.js
3. Run `./bin/build.sh pullstashio` 
4. Install local chrome extension as "Load unpacked extension..." pointing to build /pullstashio dir. Don't worry about errors.
4. Grab ID from chrome://extensions and replace dev version env.js.
6. Reload extension.
7. Ignore "key.pem" warnings. The key.pem is required in root of zip for uploading to Chrome Web Store.