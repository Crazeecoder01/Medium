/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1a73e8",
          secondary: "#ff5722",
          muted: "#f5f5f5",
          "muted-foreground": "#6b7280",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          serif: ["Merriweather", "serif"],
        },
        container: {
          center: true,
          padding: "1rem",
        },
      },
    },
    plugins: [
      require("@tailwindcss/typography"),
      require("@tailwindcss/forms"),
      require("@tailwindcss/aspect-ratio"),
    ],
  };
  