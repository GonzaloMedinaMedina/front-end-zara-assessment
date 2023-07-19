import Link from 'next/link'
import { ShowLoadingIconContext } from '@/app/layout'
import { useContext } from "react";

export default function PodcastIcon({podcastInfo}:{podcastInfo:any})
{
    const setShowLoadingIcon = useContext(ShowLoadingIconContext);
    const title: string = podcastInfo?.title?.label;
    const author: string = podcastInfo["im:artist"]?.label;
    const image = podcastInfo["im:image"]![2]!.label;
    const id = podcastInfo?.id?.attributes["im:id"];

    return <Link href={`/podcast/${id}`} onClick={() => {setShowLoadingIcon(true)}}>
        <div key={id} className=" justify-center items-center shadow-md border m-5 mt-20">
            <div className="flex justify-center items-center">
                <img className="relative rounded-full -mt-20" src={image}></img>
            </div>
            <div>
                <h1 className=" text-center font-semibold">{title.toUpperCase()}</h1>
                <p  className=" text-center text-gray-400">{"Author: " + author}</p>
            </div>
        </div>
    </Link>
}