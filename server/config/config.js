var env = process.env.NODE_ENV || 'development';
env = env.trim();

console.log(`Running on environment: ${env}`);

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        console.log('Setting:', key);
        process.env[key] = envConfig[key];
    });
}