import nextConfig from "eslint-config-next"

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".next/**", "node_modules/**", "amplify/**", ".amplify/**"],
  },
]

export default eslintConfig
