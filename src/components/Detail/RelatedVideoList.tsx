import {useState, useEffect} from 'react'
import { SingleItem } from '../../pages/Home';
import SingleVideo from '../SingleVideo';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NotFound from '../../pages/NotFound';
import { useYoutubeApi } from '../../context/YoutubeApiContext';

interface RelatedVideoListProps{
    id:string|undefined;
}

export default function RelatedVideoList({id}:RelatedVideoListProps) {
    console.log(id,'fro related')
    const [directionRow, setDirectionRow] = useState<boolean>(false);
    const handleResize = ()=>{
        const containerSize = document.querySelector('.video--detail_wrapper');
        
        const videoContainerWidth = containerSize?.getClientRects()[0].width as number;
        if(videoContainerWidth < 1200){
            // console.log("true", videoContainerWidth.toString())

            setDirectionRow(true);
        }else{
            // console.log("false", videoContainerWidth.toString())
            setDirectionRow(false);
        }
    }
    useEffect(()=>{
        window.addEventListener('resize', handleResize);
        return(()=>{
            window.removeEventListener('resize',handleResize);
        })
    },[])

    useEffect(()=>{
        handleResize();
    },[])

    const {youtube} = useYoutubeApi();

    const {isLoading, error, data:list} = useQuery(
        ['related', id], ()=>youtube.related(id),
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
                list?.map((element:any)=>{
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
