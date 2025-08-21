// Mobile build configuration for Korean Campus Connect
export default {
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
  settings: {
    isPublic: true,
    enableAnalytics: false,
    enablePWA: true,
    enableServiceWorker: true
  }
};
