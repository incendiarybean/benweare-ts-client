export default {
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    video: true,
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
};
