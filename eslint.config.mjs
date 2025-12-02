import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import tailwind from "eslint-plugin-tailwindcss";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        plugins: {
            tailwindcss: tailwind,
        },
        rules: {
            "tailwindcss/classnames-order": "warn",
            "tailwindcss/no-custom-classname": "off",
            "tailwindcss/no-contradicting-classname": "error",
        },
        settings: {
            tailwindcss: {
                callees: ["cn", "cva"],
                config: "tailwind.config.ts",
            },
        },
    },
    prettierConfig,
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
]);

export default eslintConfig;
