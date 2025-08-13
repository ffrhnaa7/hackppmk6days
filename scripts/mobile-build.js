import fs from 'fs';
import path from 'path';

const mobileConfig = {
  name: "korean-campus-connect",
  displayName: "Korean Campus Connect",
  version: "1.0.0",
  isPublic: true,
  buildConfig: {
    outputDir: "dist",
    publicPath: "/",
    minify: true,
    sourcemap: false
  },
  deployment: {
    type: "static",
    target: "mobile-preview",
    compression: true
  }
};

// Ensure the config is properly formatted for mobile build
console.log('Mobile build configuration:', JSON.stringify(mobileConfig, null, 2));

// Validate required properties
if (mobileConfig.isPublic === null || mobileConfig.isPublic === undefined) {
  console.error('Error: isPublic property is required for mobile builds');
  process.exit(1);
}

console.log('Mobile build configuration validated successfully');
