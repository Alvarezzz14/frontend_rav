/** @type {import('vls').VeturConfig} */
module.exports = {
    settings: {
        "vetur.useWorkspaceDependencies": true,
        "vetur.experimental.templateInterpolationService": true
    },
    projects: [
        './packages/frontend_rav', // Raíz de tu proyecto frontend
        {
            root: './packages/backend',
            package: './package.json',
            tsconfig: './tsconfig.json',
            snippetFolder: './.vscode/vetur/snippets',
            globalComponents: ['./src/components/**/*.vue']
        }
    ]
};
