var env = process.env.NODE_ENV || 'development';
console.log(`Running on environment: ${env}`);

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        prompt.env[key] = envConfig[key];
    });
}