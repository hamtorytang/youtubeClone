import {useEffect, useState} from 'react'
import SingleVideo from '../components/SingleVideo';
import {useParams} from 'react-router-dom'
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import { config } from '../apiKey';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NotFound from './NotFound';

export interface SingleItem{
    id: {
        videoId: string;
    },
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            },
            medium: {
                url: string;
                width: number;
                height: number;
            },
            high: {
                url: string;
                width: number;
                height: number;
            },
            maxres?: {
                url: string;
                width: number;
                height: number;
            }
        },
        channelTitle: string;
    }
}


export default function Home() {
    // const [videos, setVideos] = useState<Array<SingleItem>|undefined>(undefined);
    const {search} = useParams();

    const {isLoading, error, data:videos} = useQuery(
        ['videos', search], async function queryFn() : Promise<Array<SingleItem>> {
            return axios
            .get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&order=date&maxResults=50&q=${search}&key=${config.key}`)
            .then(res=>res.data.items);
        },
        {
            staleTime:1000 * 60 * 50
        }
    )
    if(!isLoading){
        return (
            <div style={{
                height:'100vh', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(325px, 325px))',
                gridAutoRows: '280px',
                display:'grid',
                justifyContent:'center',
                columnGap: '20px',
                rowGap: '20px',
                marginTop:'50px'
            }}>
                {
                    videos?.map((element)=>{
                        return(
                            <SingleVideo item={element} key={element.id.videoId}/>
                        )
                    })
                }
            </div>
        )
    }
    if(error){
        return(
            <NotFound/>
        )
    }
    return (
        <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            color:'white',
            height:'100vh',
            fontSize:'30px'
        }}>
            <AiOutlineLoading3Quarters style={{animation: 'spin 1s infinite linear'}}/>
        </div>
    )
}
