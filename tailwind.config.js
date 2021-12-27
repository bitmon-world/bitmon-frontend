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
      },
    },
    backgroundImage: {
      "title-background": "url('/img/section-background.png')",
    },
  },
};
