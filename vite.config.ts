import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(async () => {
  const [{ default: vue }, { default: tailwindcss }] = await Promise.all([
    import('@vitejs/plugin-vue'),
    import('@tailwindcss/vite'),
  ])

  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
    alias: {
      '@': '/src',
    },
  },
  }
})
