import React from 'react'
import { SingleItem } from '../pages/Home'
import {useNavigate} from 'react-router-dom'
import formatDate from './util/formatDate';

interface ItemProps{
    item:SingleItem;
    isRow?:boolean;
}

export default function SingleVideo({item, isRow}:ItemProps) {
    const navigate = useNavigate();
    console.log(isRow,'ISSROWW');
  return (
    <div style={{
        display:'flex', 
        justifyContent:'flex-start', 
        alignItems:isRow ? 'center' : 'flex-start',
        flexDirection: isRow ? 'row' : 'column',
        cursor:'pointer'
        }}
        onClick={()=>{
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
        <div style={{color:'white', paddingTop:'10px', maxWidth: isRow?'100%':'320px', paddingLeft: isRow ? '10px' : 0}}>
            <div>{item.snippet.title}</div>
            <div>{item.snippet.channelTitle}</div>
            <div>{formatDate(item.snippet.publishedAt)}</div>
        </div>
        
    </div>
)
}
