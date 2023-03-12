import {useEffect, useState} from 'react'
import SingleVideo from '../components/SingleVideo';
import {useParams} from 'react-router-dom'
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import NotFound from './NotFound';
import { useYoutubeApi } from '../context/YoutubeApiContext';

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
    const {searchWord} = useParams();
    const {youtube} = useYoutubeApi();
    // const queryClient = useQueryClient();
    const {isLoading, error, data:videos} = useQuery({
        queryKey: ['videos',searchWord],
        queryFn:()=>youtube.search(searchWord),
        refetchOnWindowFocus: false,
        // initialData:()=>[],
        staleTime:1000 * 60 * 30,
        // initialDataUpdatedAt:()=>queryClient.getQueryState(['videos','start'])?.dataUpdatedAt
    }
    )
    if(isLoading){
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
    if(error){
        return(
            <NotFound/>
        )
    }
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
                videos?.map((element:any)=>{
                    return(
                        <SingleVideo item={element} key={element.id.videoId}/>
                    )
                })
            }
        </div>
    )
}
