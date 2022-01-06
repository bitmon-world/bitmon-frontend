module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#2C81C3",
        "light-blue": "#73C4DA",
        green: "#30BCA4",
        "light-green": "#C8FECD",
        grey: "#e0e0e0",
        "light-orange": "#EB9441",
        orange: "#E25C27",
        purple: "#23172B",
      },
    },
    backgroundImage: {
      "title-background": "url('/img/section-background.png')",
      "attribute-background": "url('/icons/builder/attribute-background.svg')",
    },
  },
};
