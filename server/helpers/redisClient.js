const redis = require('redis');
const { v4: uuidv4 } = require('uuid');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);

const saveUrl = async (url) => {
    const redisPort = 6379; // TODO add these values to config file
    const redisHost = '127.0.0.1';
    const client = redis.createClient({
        socket: {
            port: redisPort,
            host: redisHost,
        },
    });

    const uniqueId = uuidv4();
    await client.connect();
    client.on('error', (err) => {
        throw new Error(err);
    });
    await client.set(`${uniqueId}`, url);
    client.quit();
};

module.exports = saveUrl;
