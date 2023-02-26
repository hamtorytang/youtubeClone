import React, { useEffect, useState } from 'react'

interface VideoProps{
    id:string|undefined;
}

interface SizeProps{
    width: number;
    height: number;
}

const MAX_WIDTH = 1200;
const MIN_WIDTH = 643;

const INITIAL_VIDEO_WIDTH = 850;
const INITIAL_VIDEO_HEIGHT = 478;

export default function Video({id}:VideoProps) {
    const [size, setSize] = useState<SizeProps>({width:INITIAL_VIDEO_WIDTH, height:INITIAL_VIDEO_HEIGHT});
    const handleResize = ()=>{
        const containerSize = document.querySelector('.video--detail_wrapper');

        const videoContainerWidth = containerSize?.getClientRects()[0].width as number;
        if(Number(videoContainerWidth) > MAX_WIDTH){
            return;
        }
        setSize({...resizeByRatio(videoContainerWidth)});
    }
    useEffect(()=>{
        window.addEventListener('resize', handleResize);
        return(()=>{
            window.removeEventListener('resize',handleResize);
        })
    })

    return (
    <iframe
        title={id}
        id='exiting-ifram-exammmple'
        width={size.width}
        height={size.height}
        src={`https://www.youtube.com/embed/${id}?enablejsapi=1`}
        style={{marginRight:'15px', border:'none',}}
        allowFullScreen
    />
)
}

function resizeByRatio(width:number){
    console.log(width,'wid');
    if(width < MIN_WIDTH){
        return {
            width:MIN_WIDTH,
            height:MIN_WIDTH * 0.5625,
        }
    }
    if(width < INITIAL_VIDEO_WIDTH){
        return {
            width: INITIAL_VIDEO_WIDTH,
            height: INITIAL_VIDEO_HEIGHT,
        }
    }
    if(width < MAX_WIDTH){
        return {
            width,
            height:width * 0.5625,
        }
    }
    return {
        width: INITIAL_VIDEO_WIDTH,
        height: INITIAL_VIDEO_HEIGHT,
    }
}
