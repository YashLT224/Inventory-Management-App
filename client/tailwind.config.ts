import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

// Define base colors to use in themes
const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

// Mapping of shade numbers for light/dark theme
const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

// Function to generate theme object
const generateThemeObject = (colors: any, mapping: any, invert = false) => {
  const theme: any = {};
  
  baseColors.forEach((color) => {
    theme[color] = {};
    Object.entries(mapping).forEach(([key, value]) => {
      const shadeKey = invert ? value as string : key;
      theme[color][key] = colors[color][shadeKey as keyof typeof colors[typeof color]];
    });
  });

  return theme;
};

// Generate light and dark themes based on the color mappings
const lightTheme = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

// Define the themes object for both light and dark modes
const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",  // Custom white color for light theme
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],  // Custom white for dark theme
    black: colors.gray["50"],   // Custom black for dark theme
  },
};

const config: Config = {
  darkMode: "class",  // Enables dark mode using the class strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all necessary files are included
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [createThemes(themes) as any],  // Applying the themes created dynamically
};

export default config;
