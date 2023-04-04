const redis = require('redis');
const { v4: uuidv4 } = require('uuid');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);

const redisPort = 6379; // TODO add these values to config file
const redisHost = '127.0.0.1';

const createClientAsync = async () =>
    redis.createClient({
        socket: {
            port: redisPort,
            host: redisHost,
        },
    });

class RedisClient {
    instance = null;

    constructor() {
        if (this.instance == null) {
            this.instance = createClientAsync();
        }
    }

    async getAsync() {
        const client = await this.instance;
        
        if (client.isOpen) return client;
        
        client.on('connect', () => console.log('connect'));
        client.on('ready', () => console.log('ready'));
        client.on('error', (err) => {
            throw new Error(err);
        });

        if (!client.isOpen) {
            await client.connect();
        }

        return client;
    }
}

const redisClient = new RedisClient();

// These functions should go into there own file, which specifically handles the building of the ref codes and saving them to redis, with the count.
// Or get them from redis if already exists.
const buildRefCodeAsync = async (url) => {
    const client = await redisClient.getAsync();

    const uniqueId = uuidv4();
    const visitCount = 0;
    const refCode = { url, visitCount };
    
    const refCodeJson = JSON.stringify(refCode);

    await client.set(uniqueId, refCodeJson);
    await client.set(url, uniqueId);
    
    return uniqueId;
};

const getRefCodeAsync = async (url) => {
    const client = await redisClient.getAsync();
    
    const refCode = await client.get(url);

    return refCode;
};

const updateRefCodeCountAsync = async (refCodeKey) => {
    const client = await redisClient.getAsync();
    const refCode = await client.get(refCodeKey);

    if(refCode == null) return null;

    const { url, visitCount } = refCode;
    const newVisitCount = visitCount + 1;
    const updatedRefCode = JSON.stringify({ url, newVisitCount });
    await client.set(refCodeKey, updatedRefCode);
    return newVisitCount;
};

module.exports = {
    buildRefCodeAsync,
    getRefCodeAsync,
    updateRefCodeCountAsync
};
