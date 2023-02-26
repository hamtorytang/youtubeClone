import React from 'react'
import { SingleItem } from '../../pages/Home'
interface VideoDescriptionProps{
    data: SingleItem;
}
export default function VideoDescription({data}:VideoDescriptionProps) {
return (
    <div style={{color:'white', maxWidth:'640px'}}>
        <p style={{padding:'5px'}}>{data.snippet.title}</p>
        <p style={{padding:'5px'}}>{data.snippet.channelTitle}</p>
        <p style={{padding:'5px'}}>{data.snippet.description}</p>
    </div>
)
}
