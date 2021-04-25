const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    cssnano({
      preset: "default",
    }),
    autoprefixer(),
  ],
};
