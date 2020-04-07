const path = require('path');

const rootPath = __dirname;

let config = {
    rootPath,
    uploadPath: path.join(rootPath, '/public/uploads'),
    db: {
        url: 'mongodb://localhost:27017',
        name: 'competence-db'
    },
    facebook: {
        appId: "639859043536835",
        appSecret: "6b4b54ceab2ac8ae240f9810572fd11a"
    },
    vkontakte: {
        appId: '7392114',
        appSecret: '2HIsAI8B0oqvMCsrs7sm',
        redirectUrl: '//localhost:3000'
    }
};

module.exports = config;