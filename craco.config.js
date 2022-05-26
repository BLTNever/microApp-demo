// eslint-disable-next-line no-undef
const CracoAntDesignPlugin = require('craco-antd');
const CracoAlias = require('craco-alias');
// const CracoLessPlugin = require('craco-less');
// const path = require('path');
// eslint-disable-next-line no-undef
module.exports = {
    plugins: [
        {
          plugin: CracoAlias,
          options: {
            source: "tsconfig",
            baseUrl: "./",
            tsConfigPath: "./tsconfig.paths.json",
          },
        },
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    '@primary-color': '#4BA1F5',
                },
            },
        },
    ],
};
