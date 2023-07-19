export const isOneDayDiff = (timeStampKey:string) =>
{
    const timeStamp: any | null = localStorage.getItem(timeStampKey);
    if (timeStamp === null)
        return false

    const timeDiff = ((new Date()).getTime() - timeStamp) / 1000;
    return timeDiff > 86000;
}

export const readCachedDataByPattern = (timeStampKey: string, keyPattern: string) => 
{
    var cacheData: any[] = [];

    if (isOneDayDiff(timeStampKey))
    {
        localStorage.clear();
    }
    else
    {
        for (const [key, value] of Object.entries(localStorage)) 
        {
            if (key.match( keyPattern))
            {
                let cachedObject = JSON.parse(value);
                cacheData.push(cachedObject);
            }
        }
    }

    return cacheData;
}

export const readCachedData = (timeStampKey: string, key: string) =>
{
    var cacheData: any = {};

    if (isOneDayDiff(timeStampKey))
    {
        localStorage.clear();
    }
    else
    {
        cacheData = localStorage.getItem(key);
    }

    return JSON.parse(cacheData);
}
