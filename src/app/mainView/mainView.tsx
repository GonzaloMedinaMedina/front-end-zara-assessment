
'use client';
import { useState, useMemo, useEffect } from "react";
import PodcastIcon from "./podcastIcon";

export default function MainView()
{

    const [podcastSearchInput, setPodcastSearchInput] = useState('');
    const [numberOfPodcastFound, setNumberOfPodcastFound] = useState(0);
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
                    setPodcasts(entry);
                }
            });
    }, []);

    const getPodcasts = () =>
    {
        return podcasts;
    }

    const cachedPodcasts: any[] = useMemo(() =>{ return getPodcasts() }, [podcastSearchInput, podcasts]);

    podcasts.forEach((p) => {console.log(p)});

    const podcastComponents = cachedPodcasts.map((p) => {return <PodcastIcon podcastInfo={p}></PodcastIcon>});

    return(
        <div className="relative flex flex-col py-5 min-w-full">
            <div className="flex justify-end top-10 right-10">
                <div className="min-w-10 w-10 bg-blue-600 place-content-center rounded-full">
                    <p className="text-center text-white">{numberOfPodcastFound}</p>
                </div>
                <input className="border-2 mx-5 px-2" onChange={(e) => {setPodcastSearchInput(e.target.value)}} placeholder="Filter podcasts..."></input>
            </div>
            <div className="grid grid-cols-4">
                {podcastComponents}
            </div>
        </div>
    )
}