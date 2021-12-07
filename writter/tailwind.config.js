module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    fontFamily: {
      sans: ["PragmataPro for Powerline", "monospace"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
