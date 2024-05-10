/** @type {import('tailwindcss').Config} */

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      white: "#fff",
      black: "#000",
      "colours-blue-gray-900": "#101828",
      "gray-900": "#111928",
      "red-300": "#f8b4b4",
      "yellow-300": "#faca15",
      "green-300": "#84e1bc",
      "teal-300": "#7edce2",
      "purple-200": "#dcd7fe",
      plum: "#b483ae",
      "gray-400": "#9ca3af",
      cornflowerblue: "#1d9bf0",
      lightskyblue: "#a1c2ff",
      "gray-700": "#374151",
      "colours-gray-900": "#141414",
      blueviolet: "#8e36ff",
      mediumslateblue: "#a37cff",
      // gray: "#757575",
      gray: {
        100: "#2a2a2a",
        200: "#282828",
      },
      dimgray: "#626262",
      "gray-50": "#f9fafb",
      grayz: "#282828",
      "colours-gray-500": "#757575",
      gray1: "#282828",
      darkslategray: "#242d34",
    },
    spacing: {},
    fontFamily: {
      inter: "Inter",
      lexend: "Lexend",
    },
    borderRadius: {
      "48xl": "67px",
      "6xs": "7px",
      "8xl": "27px",
      smi: "13px",
      lg: "18px",
      "24xl": "43px",
      "3xs": "10px",
      "130xl": "149px",
    },
  },
  fontSize: {
    sm: "0.88rem",
    base: "1rem",
    xs: "0.75rem",
    "3xs": "0.63rem",
    lg: "1.13rem",
    inherit: "inherit",
  },
};
export const corePlugins = {
  preflight: false,
};
