
'use client'
import { useEffect, useState, useMemo } from "react"

export default function Layout({params, children,}: {children: React.ReactNode})
{
    const podcast = params.podcast;
    const [podcastInfo, setPodcastInfo] = useState([]);
  
    useEffect(() => 
    {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcast}`)}`)
        .then(response => response.json())
        .then(data => 
        {
            var jsonContent = JSON.parse(data.contents);
            if (jsonContent!.resultCount === 1)
                setPodcastInfo(jsonContent.results[0]);                  
        })
        .catch(e => console.error(e))

    });

    const cachedPodcast: any = useMemo(() => podcastInfo, [podcastInfo]);
    const imageSource = cachedPodcast!.artworkUrl600;
    const author = cachedPodcast?.artistName;
    const title = cachedPodcast?.collectionName?.toUpperCase();

    return (<div className=" flex flex-row">
        <div className= " justify-center items-center shadow-md border m-5 mt-20 p-5">
            <img className=" max-w-300 max-h-300 p-5" src={imageSource}></img>
            <hr></hr>
            <h1 className=" text-center font-semibold">{title}</h1>
            <p  className=" text-center text-gray-400">{"by " + author}</p>
            <hr></hr>

        </div>
        <div>{children}</div>
    </div>)
}