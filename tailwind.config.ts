import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/editor/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#212134",
        secondary: "#3317E4",
        light_surface: "#D00000",
        light: "#fff",
        dark: "#121212",
        icon: "#3676FF",
        text: "#ffffff",
        divider: "",
        surface: "#01d676",
        background: "#121212",
      },
      
            
      fontFamily: {
        robo: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

    },
  },
  plugins: [],
};
export default config;
