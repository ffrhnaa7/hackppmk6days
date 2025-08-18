import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced mobile configuration with null safety
const mobileConfig = {
  name: "korean-campus-connect",
  displayName: "Korean Campus Connect",
  version: "1.0.0",
  description: "Korean cultural events and club management platform",
  isPublic: true,
  buildConfig: {
    outputDir: "dist",
    publicPath: "/",
    minify: true,
    sourcemap: false,
    target: "es2015"
  },
  deployment: {
    type: "static",
    target: "mobile-preview",
    compression: true,
    gzip: true
  },
  metadata: {
    author: "Korean Campus Connect Team",
    category: "education",
    keywords: ["korean", "campus", "events", "clubs", "cultural"],
    platform: "web"
  },
  // Explicit settings to prevent null reference errors
  settings: {
    isPublic: true,
    enableAnalytics: false,
    enablePWA: true,
    enableServiceWorker: true
  }
};

// Validation function with comprehensive checks
function validateMobileConfig(config) {
  const requiredFields = ['name', 'displayName', 'version', 'isPublic'];
  const errors = [];

  for (const field of requiredFields) {
    if (config[field] === null || config[field] === undefined) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Specific check for isPublic property
  if (typeof config.isPublic !== 'boolean') {
    errors.push('isPublic must be a boolean value');
  }

  // Ensure nested objects exist
  if (!config.buildConfig || typeof config.buildConfig !== 'object') {
    errors.push('buildConfig object is required');
  }

  if (!config.deployment || typeof config.deployment !== 'object') {
    errors.push('deployment object is required');
  }

  return errors;
}

// Create build manifest
function createBuildManifest(config) {
  const manifest = {
    ...config,
    buildTimestamp: new Date().toISOString(),
    buildId: `build-${Date.now()}`,
    environment: process.env.NODE_ENV || 'production'
  };

  return manifest;
}

// Main execution
try {
  console.log('Validating mobile build configuration...');
  
  const validationErrors = validateMobileConfig(mobileConfig);
  
  if (validationErrors.length > 0) {
    console.error('Configuration validation failed:');
    validationErrors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
  }

  console.log('✓ Mobile build configuration validated successfully');
  console.log('Configuration details:', JSON.stringify(mobileConfig, null, 2));

  // Create build manifest
  const buildManifest = createBuildManifest(mobileConfig);
  
  // Write manifest to file
  const manifestPath = path.join(__dirname, '..', 'build-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(buildManifest, null, 2));
  
  console.log('✓ Build manifest created successfully');
  console.log(`✓ isPublic property confirmed: ${mobileConfig.isPublic}`);
  
} catch (error) {
  console.error('Mobile build configuration error:', error.message);
  process.exit(1);
}
