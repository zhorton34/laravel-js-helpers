
const { readdirSync } = require('fs');

module.exports = {
  title: 'Laravel Helper Function For Javascript',
  description: 'Laravel Helper Function For Javascript (data_get, data_set, data_fill, collect, etc...)',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Installation', link: '/installation.md' },
      { text: 'Usage', link: '/usage.md' },
      { text: 'API', link: '/api.md' },
      { text: 'GitHub', link: 'https://github.com/zhorton34/laravel-js-helpers' },
    ],
    sidebar: [{
      title: 'Get started',
      collapsable: false,
      children: [
        'installation',
        'usage',
      ],
    }, {
      title: 'API',
      collapsable: false,
      children: readdirSync('docs/api', 'utf-8').map(file => `/api/${file}`),
    }],
  },
};
