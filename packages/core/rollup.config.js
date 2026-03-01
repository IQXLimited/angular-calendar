import path from "node:path";

import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
        sourcemap: false,
        exports: "named",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          "@": path.resolve("./src"),
        },
      }),
      typescript({
        tsconfig: "./tsconfig.build.json",
        declaration: false,
        exclude: [
          "src/app/**",
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.spec.ts",
          "**/*.spec.tsx",
        ],
      }),
      terser()
    ],
    external: [
      "preact",
      "preact/hooks",
      "preact/compat",
      "temporal-polyfill",
      "tslib",
      "@dayflow/blossom-color-picker",
    ],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      dts({
        compilerOptions: {
          baseUrl: ".",
          paths: {
            "@/*": ["./dist/types/*"],
          },
        },
      }),
    ],
    external: [/\.css$/],
  },
];
