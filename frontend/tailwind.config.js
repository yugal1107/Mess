const { light, dark } = require("./src/theme/appColors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/index.tsx", "./src/components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...light,
        // Add dark mode colors with a suffix if needed, or rely on 'dark:' classes
        // For example, you could use 'primary-dark': dark.primary
      },
    },
  },
  plugins: [],
}