const fetch = require("node-fetch");

const Cache = require("./cache");
const cache = new Cache();

const rootPath = 'https://amisdb.dhilip.com';

class KnightClient {
    constructor() {
        this.options = {
            url: rootPath
        };
    }

    connect(options = {}) {
        this.options = options;
        this.options.url = this.options.url ?? rootPath;
    }

    async create(projectName) {
        // TODO to be implemented
    }

    /**
     * Example knightClient
     */
    async retrieve(path) {
        if (path.startsWith('@')) {
            path = path.substr(1, path.length)
        }

        const cachedValue = cache.get(path);
        if (cachedValue) {
            return cachedValue;
        }

        const url = this.options.url + "/api/project/" + path + "/content";
        const response = await fetch(url);
        const data = await response.json()
        const content = data?.result?.content;
        if (content) {
            cache.set(path, content);
        }
        return content;
    }
}

// Test
// (async () => {
    //     console.log(await knightClient.retrieve('@dhilipb/hola-hola'))
    // })()
    
const knightClient = new KnightClient();
module.exports = knightClient;