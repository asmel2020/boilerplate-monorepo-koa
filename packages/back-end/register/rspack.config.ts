import path from "node:path";
import { defineConfig } from "@rspack/cli";

export default defineConfig({
  entry: {
    server: "./src/index.ts",
  },
  target: "node",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    library: {
      type: "commonjs2",
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["node_modules", "../../../node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: { syntax: "typescript" },
            target: "es2020",
          },
        },
      },
    ],
  },
  devtool: "cheap-module-source-map",
});
