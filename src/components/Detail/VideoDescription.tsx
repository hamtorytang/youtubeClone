import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useYoutubeApi } from '../../context/YoutubeApiContext';
import { SingleItem } from '../../pages/Home'
import NotFound from '../../pages/NotFound';
interface VideoDescriptionProps{
    data: SingleItem;
}

interface ChannelInfoProps{
    "snippet": {
        "title": string;
        "description": string;
        "customUrl": string;
        "publishedAt": string;
        "thumbnails": {
            "default": {
                "url": string;
                "width": number;
                "height": number;
            },
            "medium": {
                "url": string;
                "width": number;
                "height": number;
            },
            "high": {
                "url": string;
                "width": number;
                "height": number;
            }
        },
    }
}
export default function VideoDescription({data}:VideoDescriptionProps) {
    const {youtube} = useYoutubeApi();

    const {isLoading, error, data:channelData} = useQuery(
        ['description', data.snippet.channelId], ()=>youtube.description(data.snippet.channelId),
        {
            staleTime:1000 * 60 * 50
        }
    )

    
    if(isLoading){
        return(
        <div style={{color:'white', maxWidth:'640px'}}>
            <p style={{padding:'5px'}}>Loading...</p>
        </div>
        )
    }
    if(error){
        return(
            <NotFound/>
        )
    }
    return (
        <div style={{color:'white', maxWidth:'640px'}}>
            <img src={(channelData as ChannelInfoProps[])[0].snippet.thumbnails.default.url} style={{width:80, height:80, border: '1px solid black', borderRadius:'50%'}} alt={(channelData as ChannelInfoProps[])[0].snippet.description}/>
            <p style={{padding:'5px'}}>{data.snippet.title}</p>
            <p style={{padding:'5px'}}>{data.snippet.channelTitle}</p>
            <p style={{padding:'5px'}}>{data.snippet.description}</p>
        </div>
    )
}
