
'use client';
import { useState, useMemo, useEffect } from "react";
import PodcastIcon from "./podcastIcon";

export default function MainView()
{
    const [podcastSearchInput, setPodcastSearchInput] = useState('');
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() =>
    {
        fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        .then(response => response.json())
        .then(data => 
            {
                const entry = data!.feed!.entry!
                if (entry.length! > 0)
                {
                    const podcastsComponents = entry.map((p) => 
                    {
                        return <PodcastIcon podcastInfo={p}></PodcastIcon>
                    });
                    
                    setPodcasts(podcastsComponents);
                }
            });
    }, []);
    
    const podcastMatchWithSearchInput = (podcast: any) =>
    {
        if (podcastSearchInput === '')
            return true;
            
        const podcastInfo = podcast!.props!.podcastInfo;
        const title: string = podcastInfo!.title!.label;
        const author: string = podcastInfo["im:artist"]!.label;
    
        return title.toLowerCase().includes(podcastSearchInput) || 
            author.toLowerCase().includes(podcastSearchInput);
    }

    const cachedPodcasts: any[] = useMemo(() => podcasts.filter((p) => podcastMatchWithSearchInput(p) === true) , [podcasts, podcastSearchInput]);

    return(
        <div className="relative flex flex-col py-5 min-w-full">
            <div className="flex justify-end top-10 right-10">
                <div className="min-w-10 w-10 bg-blue-600 place-content-center rounded-full">
                    <p className="text-center text-white">{cachedPodcasts.length}</p>
                </div>
                <input className="border-2 mx-5 px-2" onChange={(e) => {setPodcastSearchInput(e.target.value.toLowerCase())}} placeholder="Filter podcasts..."></input>
            </div>
            <div className="grid grid-cols-4 py-5">
                {cachedPodcasts}
            </div>
        </div>
    )
}