'use client'
import { useEffect, useContext, useState } from "react"
import { readCachedData } from "@/app/utils";
import { PodcastDetailsContext } from "./layout";

var parseString = require('xml2js').parseString;

export default function Page({params})
{    
    const podcastId = params.podcast;

    const podcastEpisodesTimeStampKey = `podcastEpisodesTimeStamp${podcastId}`;
    const podcastEpisodesKey = `podcastEpisodes${podcastId}`;

    const [episodeList, setEpisodeList] = useState([]);
    const podcastDetails = useContext(PodcastDetailsContext);

    const getFormatDate = (stringDate: string) => 
    {
        const date = new Date(stringDate);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const createEpisodeObject = (item: any) =>
    {
        return {
            title: item.title[0],
            date: getFormatDate(item.pubDate[0]),
            duration: item['itunes:duration'],
            id: item.guid[0]['_'],
            soundContent: item['enclosure'][0]['$'].url,
            description: item['description']
        }
    }

    const readCachedEpisodes = () => 
    {
        return readCachedData(podcastEpisodesTimeStampKey, podcastEpisodesKey);
    }

    useEffect(() =>
    {
        let cachedEpisodes: [] = readCachedEpisodes();

        if (cachedEpisodes === null)
        {
            const feedUrl = podcastDetails?.feedUrl;
            if (feedUrl !== '' && feedUrl !== undefined)
            {
                fetch(`https://api.allorigins.win/get?url=${feedUrl}`)
                .then(response => response.json())
                .then(data => 
                {
                    parseString(data.contents, function (err, result) 
                    {
                        const episodeList: [] = result?.rss?.channel[0]?.item;

                        if (episodeList)
                        {
                            var episodeObjectList: [] = [];
                            episodeList.forEach(i => 
                            {
                                episodeObjectList.push(createEpisodeObject(i));
                            });

                            localStorage.setItem(podcastEpisodesKey, JSON.stringify(episodeObjectList));
                            localStorage.setItem(podcastEpisodesTimeStampKey, JSON.stringify((new Date()).getTime()));
                            setEpisodeList(episodeObjectList);
                        }
                    });
                })
            }
        }
        else
        {
            setEpisodeList(cachedEpisodes);
        }

    }, [podcastDetails]);

    var gray: boolean = true;
    const episodeComponents = episodeList.map(e =>
    {
        let bgColor = gray ? "bg-gray-100" : "";
        gray = !gray;

        return <div className={"flex flex-inline py-1 " + bgColor}>
            <a className="w-full px-5 text-blue-600" href={`/podcast/${podcastId}/episode/${e.id}`}>{e.title}</a>
            <p className="px-20">{e.date}</p>
            <p className="px-5">{e.duration}</p>
        </div>
    });

    return (<>
            <div className="shadow-md border p-5 mb-10 text-2xl font-bold">Episodes: {episodeList.length}</div>
            <div className="shadow-md border p-5">
                <div className="flex flex-inline py-1">
                    <p className="w-full px-5 text-xl">Title</p>
                    <p className="px-20 text-xl">Date</p>
                    <p className="px-5 text-xl">Duration</p>
                </div>
                <div>{episodeComponents}</div>
            </div>
        </>)
}