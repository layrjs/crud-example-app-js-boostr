export default () => ({
  type: 'application',

  services: {
    frontend: './frontend',
    backend: './backend',
    database: './database'
  },

  environment: {
    APPLICATION_NAME: 'CRUD Example App',
    APPLICATION_DESCRIPTION:
      'An example showing how to build a simple CRUD app with Layr and Boostr.'
  },

  stages: {
    production: {
      environment: {
        NODE_ENV: 'production'
      }
    }
  }
});
