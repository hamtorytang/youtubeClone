import React from 'react'
import { SingleItem } from '../pages/Home'
import {useNavigate} from 'react-router-dom'

interface ItemProps{
    item:SingleItem;
}

export default function SingleVideo({item}:ItemProps) {
    const navigate = useNavigate();
  return (
    <div style={{
        display:'flex', 
        justifyContent:'flex-start', 
        alignItems:'flex-start',
        flexDirection:'column',
        cursor:'pointer'
        }}
        onClick={()=>{
            console.log(item.id.videoId);
            navigate(`/video/${item.id.videoId}`,{
                state:{
                    ...item
                }
            })
        }}
    >
        <img 
        src={item.snippet.thumbnails.medium.url}
        alt={item.snippet.description} 
        style={{height:'180', width:'320', objectFit:'contain', borderRadius:'5%'}}
        />
        <div style={{color:'white', paddingTop:'10px', maxWidth:'320px'}}>
            <div>{item.snippet.title}</div>
            <div>{item.snippet.channelTitle}</div>
            <div>{item.snippet.publishedAt}</div>
        </div>
        
    </div>
)
}
