export const isOneDayDiff = (timeStampKey) =>
{
    const timeStamp = localStorage.getItem(timeStampKey);
    const timeDiff = ((new Date()).getTime() - timeStamp) / 1000;
    return timeDiff > 86000;
}

export const readCachedData = (timeStampKey: string, keyPattern: string) => 
{
    const allCachedData = {...localStorage};
    var cacheData: [] = [];

    if (isOneDayDiff(timeStampKey))
    {
        for (const [key, value] of Object.entries(allCachedData)) 
        {
            if (key.match( keyPattern))
            {
                let cachedObject = JSON.parse(value);
                cacheData.push(cachedObject);
            }
        }
    }
    else
    {
        localStorage.clear();
    }

    return cacheData;
}
