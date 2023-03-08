import {useState, useEffect} from 'react'
import { SingleItem } from '../../pages/Home';
import SingleVideo from '../SingleVideo';
import {config} from '../../apiKey';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NotFound from '../../pages/NotFound';

interface RelatedVideoListProps{
    id:string|undefined;
}

export default function RelatedVideoList({id}:RelatedVideoListProps) {
    const [directionRow, setDirectionRow] = useState<boolean>(false);
    const handleResize = ()=>{
        const containerSize = document.querySelector('.video--detail_wrapper');

        const videoContainerWidth = containerSize?.getClientRects()[0].width as number;
        if(Number(videoContainerWidth) < 1200){
            setDirectionRow(true);
        }else{
            setDirectionRow(false);
        }
    }
    useEffect(()=>{
        window.addEventListener('resize', handleResize);
        return(()=>{
            window.removeEventListener('resize',handleResize);
        })
    })

    const {isLoading, error, data:list} = useQuery(
        ['videos', id], async function queryFn() : Promise<Array<SingleItem>> {
            return axios
            .get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&maxResults=20&relatedToVideoId=${id}&type=video&key=${config.key}`)
            .then(res=>res.data.items);
        },
        {
            staleTime:1000 * 60 * 50
        }
    )
    
    if(isLoading){
        return(
            <div style={{color:'white'}}>
                Loading....
            </div>
        )
    }
    if(error){
        return(
            <NotFound/>
        )
    }
    return (
        <ul style={{color:'white'}}>
            {
                list?.map((element)=>{
                    return(
                        <li style={{
                            listStyle:'none', 
                        }}
                        key={element.id.videoId}
                        >
                            <SingleVideo item={element} isRow={directionRow}/>
                        </li>
                    )
                })
            }
        </ul>
    )
}
