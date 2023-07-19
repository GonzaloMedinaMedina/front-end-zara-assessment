'use client'
import { useState, useEffect, useContext } from "react"
import { readCachedData } from "@/app/utils";
import { ShowLoadingIconContext } from '@/app/layout'

export default function Page({params}: {params:any})
{
    const podcastId = params.podcast;
    const episodeId = params.episode;
    const podcastEpisodesTimeStampKey = `podcastEpisodesTimeStamp${podcastId}`;
    const podcastEpisodesKey = `podcastEpisodes${podcastId}`;
    const setShowLoadingIcon = useContext(ShowLoadingIconContext);

    const [currentEpisode, setCurrentEpisode] = useState(
    {
        soundContent: '',
        title: '',
        description: ''
    });

    const readCahedPodcastEpisodes = () =>
    {
        return readCachedData(podcastEpisodesTimeStampKey, podcastEpisodesKey);
    }
    
    useEffect(() => 
    {
        const cachedEpisodes: any[] = readCahedPodcastEpisodes();
        const episodeInfo = cachedEpisodes.find(e => e.id == episodeId);
        setCurrentEpisode(episodeInfo);
        setShowLoadingIcon(false)
    }, 
    []);

    const soundComponent = currentEpisode.soundContent !== '' ?
    <audio controls>
            <source src={currentEpisode.soundContent}/>
        </audio>
        :
        ''

    return <div className="hadow-md border p-5 mb-10">
        <p className="w-full p-5 text-xl">{currentEpisode.title}</p>
        <div className="text-gray-600 italic p-5">{currentEpisode.description}</div>
        {soundComponent}
    </div>
}