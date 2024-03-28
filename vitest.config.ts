import react from '@vitejs/plugin-react';
import { defineConfig, defaultExclude } from 'vitest/config';

export default defineConfig({
    plugins: [
        react(),
        {
            name: 'setup',
            config: () => ({
                test: {
                    setupFiles: ['./vitest.setup.ts'],
                },
            }),
        },
    ],
    test: {
        environment: 'jsdom',
        coverage: {
            exclude: [...defaultExclude, '**/*/__mocks__'],
        },
        globals: true,
        include: ['**/(*.)?{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: [...defaultExclude, '**/*/__mocks__'],
    },
});
