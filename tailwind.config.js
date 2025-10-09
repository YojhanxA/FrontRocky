export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  corePlugins: { preflight: false }, // 👈 desactiva el reset global
  theme: {
    extend: {
      /* tus colores y fuentes */
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
