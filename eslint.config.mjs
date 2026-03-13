// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
// ]);

// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    { languageOptions: { globals: globals.browser } },
    {
        rules: {
            eqeqeq: "off",
            "no-unused-vars": "error",
            "no-unused-expressions": "error",
            "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
            "no-undef": "error",
        },
    },
    {
        ignores: [".node_modules/*"],
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
