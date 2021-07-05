class Cache {

    constructor(
        defaultTtl = 30 * 1000
    ) {
        this.cache = {};
    }

    get(key, defaultValue = null) {
        if (!this.isExpired(key)) {
            return this.cache?.[key]?.value;
        }
        return defaultValue;
    }

    set(key, value, ttl = this.defaultTtl) {
        this.cache[key] = {
            value,
            ttl: (+new Date()) + ttl
        }
    }

    clear() {
        this.cache = {}
    }

    remove(key) {
        delete this.cache[key];
    }

    isExpired(key) {
        return this.cache?.[key]?.ttl < +new Date();
    }
    
}

module.exports = Cache;