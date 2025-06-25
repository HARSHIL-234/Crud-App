/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#5A5959",
        blue: "#2C51BE",
        yellow: "#FFEAAE",
        pale: "#F5DE00",
        "dark-yellow": "#FCCA3F",
        orange: "#F6820c",
        white: "#FFFFFF",
        medblue:"#7DB1E3", 
        
      },
    },
  },
  plugins: [],
};
