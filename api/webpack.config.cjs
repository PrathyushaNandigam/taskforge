/**
 * Keep Nx's generated webpack config; don't override entry points.
 * This prevents Webpack from falling back to "./src" at the repo root.
 */
module.exports = (config, ctx) => {
  return config;
};
