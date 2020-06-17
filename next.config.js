const withSass = require("@zeit/next-sass");

module.exports = withSass({
  experimental: {
    jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
});
