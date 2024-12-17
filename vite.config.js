// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   // server:{
//   //   port:80,
//   // },
//   plugins: [react()],
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Checker({
      typescript: false,  // Disable TypeScript checking if you're not using it
      eslint: false,  // Disable ESLint checking
      caseSensitivePaths: true, // Enforce case-sensitive path checks
    }),
  ],
})
