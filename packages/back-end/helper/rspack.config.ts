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
  },
  resolve: {
    extensions: [".ts", ".js"],
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
