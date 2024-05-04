module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest'
    },
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx'],
    testEnvironment: 'jsdom',
};
