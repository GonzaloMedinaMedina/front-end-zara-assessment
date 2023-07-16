
'use client'
import { useEffect, useState, useMemo } from "react"

export default function Layout({params, children,}: {children: React.ReactNode})
{
    const [summary, setSummary] = useState('')
    const [imageSource, setImageSource] = useState('')
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')

    const podcast = params.podcast;
    const [podcastDetails, setPodcastDetails] = useState([]);
    var cachedPodcastInfo: any;

    useEffect(() => 
    {
        const cachedPodcastInfoString = localStorage.getItem(`podcast${podcast}`);
        cachedPodcastInfo = JSON.parse(cachedPodcastInfoString ? cachedPodcastInfoString : '');
        setSummary(cachedPodcastInfo.summary.label);

        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcast}`)}`)
        .then(response => response.json())
        .then(data => 
        {
            var jsonContent = JSON.parse(data.contents);
            if (jsonContent!.resultCount === 1)
            {
                setPodcastDetails(jsonContent.results[0]);       
                setImageSource(cachedPodcastDetails.artworkUrl600);
                setAuthor(cachedPodcastDetails.artistName);
                setTitle(cachedPodcastDetails.collectionName?.toUpperCase());           
            }
        })
        .catch(e => console.error(e))
    });

    const cachedPodcastDetails: any = useMemo(() => podcastDetails, [podcastDetails]);

    return (<div className=" flex flex-row">
        <div className= " justify-center items-center shadow-md border m-5 mt-20 p-5">
            <img className=" max-w-300 max-h-300 p-5" src={imageSource}></img>
            <hr></hr>
            <h1 className=" text-center font-semibold">{title}</h1>
            <p  className=" text-center text-gray-400">{"by " + author}</p>
            <hr></hr>
            <div>{summary}</div>
        </div>
        <div>{children}</div>
    </div>)
}