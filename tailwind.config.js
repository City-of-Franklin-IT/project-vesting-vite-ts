/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C4E80",
        primaryContent: "#CFDAE6",
        secondary: "#7C909A",
        secondaryContent: "#050709",
        accent: "#EA6947",
        accentContent: "#130402",
        neutral: "#23282E",
        neutralContent: "#CECFD1",
        b1: "#202020",
        b2: "#1C1C1C",
        b3: "#181818",
        baseContent: "#CDCDCD",
        info: "#0091D5",
        infoContent: "#000710",
        success: "#6BB187",
        successContent: "#040C06",
        warning: "#DBAE59",
        warningContent: "#110B03",
        error: "#AC3E31",
        errorContent: "#F2D8D4"
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#1C4E80",
          primaryContent: "#CFDAE6",
          secondary: "#7C909A",
          secondaryContent: "#050709",
          accent: "#EA6947",
          accentContent: "#130402",
          neutral: "#23282E",
          neutralContent: "#CECFD1",
          b1: "#202020",
          b2: "#1C1C1C",
          b3: "#181818",
          baseContent: "#CDCDCD",
          info: "#0091D5",
          infoContent: "#000710",
          success: "#6BB187",
          successContent: "#040C06",
          warning: "#DBAE59",
          warningContent: "#110B03",
          error: "#AC3E31",
          errorContent: "#F2D8D4"
        }
      }
    ]
  }
}