import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigpaths from 'vite-tsconfig-paths';
import { version } from './package.json';

export default defineConfig({
    plugins: [react(), tsconfigpaths()],
    server: {
        port: 3000,
        proxy: {
            '/api/': 'https://dev.benweare.co.uk',
            '/socket.io/': 'https://dev.benweare.co.uk',
        },
    },
    define: {
        VITE_APP_VERSION: JSON.stringify(version),
    },
    optimizeDeps: {
        include: ['react-dom/client', 'react-toastify'],
    },
    build: {
        outDir: './build',
        minify: 'esbuild',
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
                entryFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
            },
            external: ['**/*.cy.tsx'],
        },
    },
});
