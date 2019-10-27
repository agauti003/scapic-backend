/*eslint-disable */

module.exports = {
  apps: [{
    name: 'API',
    script: 'npx',
    args: 'babel-node --presets=@babel/preset-env -- app.js',
    instances: 1,
    "exec_mode": "cluster",
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
