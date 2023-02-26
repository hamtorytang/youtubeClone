import {useState, useEffect} from 'react'
import { SingleItem } from '../../pages/Home';
import SingleVideo from '../SingleVideo';
import {config} from '../../apiKey';

interface RelatedVideoListProps{
    id:string|undefined;
}

export default function RelatedVideoList({id}:RelatedVideoListProps) {
    const [list, setList] = useState<Array<SingleItem>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&maxResults=20&relatedToVideoId=${id}&type=video&key=${config.key}`)
        .then((res)=>res.json())
        .then(data=>{
            setList(data.items);
            console.log(data.items,'arg');
        })
        .catch((e)=>console.log(e))
        .finally(()=>setLoading(true));
    },[]);
    
    if(!loading){
        return(
            <div style={{color:'white'}}>
                Loading....
            </div>
        )
    }
    return (
        <ul style={{color:'white'}}>
            {
                list.map((element)=>{
                    return(
                        <li style={{
                            listStyle:'none', 
                        }}
                        key={element.id.videoId}
                        >
                            <SingleVideo item={element}/>
                        </li>
                    )
                })
            }
        </ul>
    )
}
