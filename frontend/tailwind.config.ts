import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      
      colors: {
        codo: {
          green: "#00B663",    
          blue: "#00203F",     
          haze: "#F0F3FF",     
          dark: "#0A0A0B",     
        }
      },
      fontFamily: {
        
        sans: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        'codo-sm': '12px',
        'codo-md': '16px',
      }
    },
  },
  plugins: [],
};

export default config;
