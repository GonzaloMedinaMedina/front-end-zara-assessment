
'use client'
import Link from 'next/link'
import { useEffect, useState, useContext, createContext } from "react"
import { readCachedData } from "../../utils";
import { ShowLoadingIconContext } from '@/app/layout'

export const PodcastDetailsContext = createContext(
    {
        artworkUrl600: '',
        artistName: '',
        collectionName: '',
        feedUrl: '',
        summary: { label: '' }
    });

export default function Layout({params, children}: {params:any, children: React.ReactNode})
{
    const podcast = params.podcast;
    const podcastDetailsCacheKey: string = `podcastDetails${podcast}`;
    const podcastDetailsTimeStampKey: string = `podcastDetails${podcast}TimeStamp`;
    const setShowLoadingIcon = useContext(ShowLoadingIconContext);

    const [podcastDetails, setPodcastDetails] = useState(
    {
        artworkUrl600: '',
        artistName: '',
        collectionName: '',
        feedUrl: '',
        summary: { label: '' }
    });

    const readCachedPodcastDetails = () =>
    {
        return readCachedData(podcastDetailsTimeStampKey, podcastDetailsCacheKey);
    }

    useEffect(() => 
    {
        const cachedPodcastObject: any = readCachedPodcastDetails();

        if (cachedPodcastObject === null)
        {
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcast}`)}`)
            .then(response => response.json())
            .then(data => 
            {
                var jsonContent = JSON.parse(data.contents);
                if (jsonContent!.resultCount === 1)
                {
                    const podcastDetails = jsonContent.results[0];
                    setPodcastDetails(podcastDetails);

                    localStorage.setItem(podcastDetailsTimeStampKey, JSON.stringify(((new Date()).getTime())));
                    localStorage.setItem(podcastDetailsCacheKey, JSON.stringify(podcastDetails));
                }
            })
            .catch(e => console.error(e))
        }
        else
        {
            setPodcastDetails(cachedPodcastObject);
        }

    }, []);

    return (<div className=" flex flex-row p-5">
        <Link className="max-w-xs max-h-xs	" href={`/podcast/${podcast}`}  onClick={() => {setShowLoadingIcon(true)}}>
            <div className= " justify-center items-center shadow-md border m-5 p-5">
                <img className=" max-w-300 max-h-300 p-5" src={podcastDetails?.artworkUrl600}></img>
                <hr></hr>
                <div className=" text-left py-5 ">
                    <h1 className=" font-bold">{podcastDetails?.collectionName?.toUpperCase()}</h1>
                    <p  className=" text-gray-400 italic">{"by " + podcastDetails?.artistName}</p>
                </div>
                <hr></hr>
                <div className="mt-5">
                    <div className="font-bold">Description:</div>
                    <div className="italic text-ellipsis overflow-hidden">{podcastDetails?.summary?.label}</div>
                </div>
            </div>
        </Link>
        <div className="m-5 mx-20 w-full">
            <PodcastDetailsContext.Provider value={podcastDetails}>
                {children}
            </PodcastDetailsContext.Provider>
        </div>
    </div>)
}