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
        grey: "#e0e0e0",
        "light-orange": "#EB9441",
        orange: "#E25C27",
        skins: {
          1: "#D0A884",
          2: "#FCEEE3",
          3: "#EAB874",
          4: "#392A27",
          5: "#F7C7C3",
          6: "#BBB7CD",
          7: "#CEC96B",
          8: "#CF7BB3",
        }
      },
    },
    backgroundImage: {
      "title-background": "url('/img/section-background.png')",
    },
  },
};
