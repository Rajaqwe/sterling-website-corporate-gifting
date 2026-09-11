import nextConfig from "eslint-config-next";

export default [
  ...nextConfig,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "src/generated/**",
      "dist/**",
      "out/**",
      ".claude/**",
      "tests/**",
      "docs/**",
      "scripts/**"
    ]
  },
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/incompatible-library": "off",
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "warn",
      "@next/next/no-location-assign-relative-destination": "warn"
    }
  }
];
