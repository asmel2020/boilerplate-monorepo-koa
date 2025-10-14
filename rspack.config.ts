import path from "node:path";
import { defineConfig } from "@rspack/cli";

export default defineConfig({
  entry: {
    server: "./packages/back-end/server/src/server.ts",
  },
  target: "node",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@register": path.resolve(__dirname, "packages/back-end/register/src"),
      "@helper": path.resolve(__dirname, "packages/back-end/helper/src"),
      "@models": path.resolve(__dirname, "packages/back-end/models/src"),
    },
  },
  externals: {
    "koa-body": "commonjs koa-body",
    "@koa/router": "commonjs @koa/router",
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
