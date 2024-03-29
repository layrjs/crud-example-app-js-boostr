export default ({services}) => ({
  type: 'web-frontend',

  dependsOn: 'backend',

  environment: {
    BACKEND_URL: services.backend.url
  },

  rootComponent: './src/index.js',

  html: {
    language: 'en',
    head: {
      title: services.frontend.environment.APPLICATION_NAME,
      metas: [
        {name: 'description', content: services.frontend.environment.APPLICATION_DESCRIPTION},
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {'http-equiv': 'x-ua-compatible', 'content': 'ie=edge'}
      ],
      links: [{rel: 'icon', href: '/boostr-favicon-3NjLR7w1Mu8UAIqq05vVG3.immutable.png'}]
    }
  },

  stages: {
    development: {
      url: 'http://localhost:16287/',
      platform: 'local'
    }
  }
});
