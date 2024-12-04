/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
  "./node_modules/flowbite/**/*.js",
];
export const theme = {
  extend: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "4rem",
        lg: "4rem",
        xl: "6rem",
      },
    },
  },
};
export const plugins = [require("flowbite/plugin")];
