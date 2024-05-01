import storage from 'node-persist'

storage.init();

export async function getCachedData(key, fallback, maxRetries = 2) {
    let retryCount = 0;
    while (retryCount <= maxRetries) {
        try {
            // 检查存储中是否已经有缓存数据
            let cacheData = await storage.getItem(key);
            if (cacheData) {
                console.log(`Using cached data for key ${key}`);
                return cacheData;
            }
    
            // 如果没有缓存数据，调用 fallback 函数获取数据，
            let data = await fallback();
            await storage.setItem(key, data);
            return data;
        } catch (error) {
            console.log(error);
            // 如果在获取或存储数据时发生错误，则重试或者抛出错误
            if (retryCount == maxRetries) throw error;
            console.log(`Error occurred, retrying in 10 seconds... (${retryCount+1}/${maxRetries})`);
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }
}