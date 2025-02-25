/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Specifies the files Tailwind should scan for class names
   theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], // Replace "Inter" with your preferred sans-serif font
      },
    },
  },
  plugins: [], // Placeholder for any Tailwind plugins you might want to add
};
