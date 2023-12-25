module.exports = {
    apps: [
      {
        name: 'MirAdmin',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs',
      port: 5000
      }
    ]
  }