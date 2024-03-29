import typescript from "rollup-plugin-typescript2";
import sass from "rollup-plugin-sass";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";

import pkg from "./package.json";

export default {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
            sourcemap: true
        }
    ],
    plugins: [
        external([
            'react',
            'react-dom',
        ]),
        resolve({
            browser: true
        }),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true
        }),
        commonjs({
            include: ["node_modules/**"],
            exclude: ["**/*.stories.js"],
            namedExports: {
                "node_modules/react/react.js": [
                    "Children",
                    "Component",
                    "PropTypes",
                    "createElement"
                ],
                "node_modules/react-dom/index.js": ["render"]
            }
        }),
        sass({
            insert: true
        })
    ]
};
