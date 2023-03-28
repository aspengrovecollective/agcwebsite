const redis = require('redis');

const saveUrl = async (url) => {
    const client = redis.createClient();
    const uniqueId = Math.random();
    client.on('error', (err) => {
        console.log(`Error ${err}`);
        throw new Error(err);
    });
    client.set(`${uniqueId}`, url, redis.print);
    client.quit();
};

module.exports = saveUrl;
