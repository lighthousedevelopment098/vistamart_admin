// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}", // Adjust as needed if you use TypeScript
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'primary': '#009444',
//         'primary-500':'#009444',
//         'primary-dark': '#4CAF50', // Darker shade of the primary color
//         'primary-dark-500':'#4CAF50',
//         'secondary': '#F7FAFF', // Secondary color table header (another green shade)
//         'secondary-500': '#F7FAFF', // Secondary color table header (another green shade)
//         'alert': '#d33', // Red color for alerts or warnings
//         'confirm': '#3085d6', // Blue color for confirmation buttons
//         'tbheader-500':'#F7FAFF'//table header color like lightblue
//       },
//     },
//   },
//   plugins: [],
// };






/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust as needed if you use TypeScript
  ],
  theme: {
    extend: {
      colors: {
        'primary': "var(--secondary-color)",
        // 'primary-500':'#009444',
        'primary-500':"var(--primary-color)",
        'primary-dark': '#4CAF50', // Darker shade of the primary color
        'primary-dark-500':"var(--secondary-color)",
        'secondary': '#F7FAFF', // Secondary color table header (another green shade)
        'secondary-500': '#F7FAFF', // Secondary color table header (another green shade)
        'alert': '#d33', // Red color for alerts or warnings
        'confirm': '#3085d6', // Blue color for confirmation buttons
        'tbheader-500':'#F7FAFF'//table header color like lightblue
      },
    },
  },
  plugins: [],
};
