import path from "path";
import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import node_resolve from "@rollup/plugin-node-resolve";
import hotcss from "rollup-plugin-hot-css";
import commonjs from "rollup-plugin-commonjs-alternate";
import static_files from "rollup-plugin-static-files";
import { terser } from "rollup-plugin-terser";
import refresh from "rollup-plugin-react-refresh";

const root = path.resolve(__dirname);

let config = {
  input: "./playground/main.js",
  output: {
    dir: "dist",
    format: "esm",
    entryFileNames: "[name].[hash].js",
    assetFileNames: "[name].[hash][extname]",
  },
  plugins: [
    alias({
      entries: [{ find: "@", replacement: path.resolve(root, "src") }],
    }),
    hotcss({
      hot: process.env.NODE_ENV === "development",
      filename: "styles.css",
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    node_resolve(),
    commonjs({
      define: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      },
    }),
    process.env.NODE_ENV === "development" && refresh(),
  ],
};

if (process.env.NODE_ENV === "production") {
  config.input = "./src/main.js";
  config.external = ["react", "react-dom"];

  config.plugins = config.plugins.concat([
    terser({
      compress: {
        global_defs: {
          module: false,
        },
      },
    }),
  ]);
}

export default config;
