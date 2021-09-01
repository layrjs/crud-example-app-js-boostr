export default () => ({
  type: 'application',

  name: 'CRUD Example App',
  description: 'An example showing how to build a simple CRUD app with Layr and Boostr.',

  services: {
    frontend: './frontend',
    backend: './backend',
    database: './database'
  },

  stages: {
    production: {
      environment: {
        NODE_ENV: 'production'
      }
    }
  }
});
