/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkgreen: "#122B1F",
        verdigris: "#56A3A6",
        sage: "#CAD49D",
        coyote: "#7E685A",
        eucalyptus: "#3b7056"
      },
    },
  },
  plugins: [],
};
