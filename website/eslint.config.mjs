import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/*
  Flat config via eslint-config-next's own subpath exports. The older
  FlatCompat + `compat.extends(...)` bridge crashes on ESLint 9 with
  "Converting circular structure to JSON" — this is the supported path,
  and matches the sibling Tarak Gurukul site.
*/
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
