const redis = require('redis');
const { v4: uuidv4 } = require('uuid');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);

const redisPort = 6379; // TODO add these values to config file
const redisHost = '127.0.0.1';

const createClient = () =>
    redis.createClient({
        socket: {
            port: redisPort,
            host: redisHost,
        },
    });

class RedisClient {
    _instance = null;

    constructor() {
        if (this._instance == null) {
            this._instance = createClient();
            this._instance.on('connect', () => console.log('connect'));
            this._instance.on('ready', () => console.log('ready'));
            this._instance.on('error', (err) => {
                throw new Error(err);
            });
        }
    }

    getClient() {
        return this._instance;
    }
}

const redisClient = new RedisClient();

const getClientAsync = async () => {
    const client = redisClient.getClient();

    if(client.isOpen) return client;

    if (!client.isOpen) {
        await client.connect();
    }

    return client;
};

const saveOrGetUrlAsync = async (url) => {
    const client = await getClientAsync();
    const uniqueId = uuidv4();
    const result = await client.get(url);

    if(result !== null) return result;
    
    await client.set(url, `${uniqueId}`);
    
    return uniqueId;
};

const getUrlAsync = async (url) => {
    const client = await getClientAsync();
    const result = await client.get(url);
    return result;
};

module.exports = {
    saveOrGetUrlAsync,
    getUrlAsync,
};
