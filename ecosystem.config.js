// Config pm2 pour faire tourner le serveur Expo (mode tunnel) en continu 24/7.
// Usage sur le serveur :  pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'revolut-expo',
      script: 'npm',
      args: 'run tunnel',
      cwd: __dirname,
      env: {
        CI: '1', // mode non-interactif : Expo ne reste pas bloqué à attendre des touches
      },
      autorestart: true,
      max_restarts: 20,
      restart_delay: 5000,
    },
  ],
};
