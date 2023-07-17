'use client'
import { useContext, useState, useEffect } from "react"
import { EpisodeListContext } from "../../layout"

export default function Page({params})
{
    const [currentEpisode, setCurrentEpisode] = useState(
        {
            soundContent: '',
            title: '',
            description: ''
        }
    )
    const episodeList = useContext(EpisodeListContext);

    useEffect(() => 
    {
        if (episodeList.length > 0)    
            setCurrentEpisode(episodeList.find(e => e.id == params.episode));
    }, 
    [episodeList]);


    return <div className="hadow-md border p-5 mb-10">
        <p className="w-full p-5 text-xl">{currentEpisode.title}</p>
        <div className="text-gray-600 italic p-5">{currentEpisode.description}</div>
        <audio controls>
            <source src={currentEpisode.soundContent}/>
        </audio>
    </div>
}