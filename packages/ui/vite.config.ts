import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KrisloremUI',
      fileName: (format) => format === 'es' ? 'index.js' : `index.${format}.js`,
      formats: ['es', 'cjs']
    },
    emptyOutDir: false,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'styled-components',
        'framer-motion',
        /^react(\/.*)?/
      ],
      output: {
        dir: 'dist',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styledComponents'
        },
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    },
    outDir: 'dist',
    minify: false
  }
});
