import {useEffect} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import Video from '../components/Detail/Video';
import RelatedVideoList from '../components/Detail/RelatedVideoList';
import VideoDescription from '../components/Detail/VideoDescription';

export default function VideoDetail() {
  const {id} = useParams();
  const data = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
    console.log('from parent', id);
  }, [])
  

  return (
    <div 
    className='video--detail_wrapper'
    style={{display:'flex', flexWrap:'wrap',marginTop:'25px'
  }}>
      <section>
        <Video id={id}/>
        <VideoDescription data={{...data.state}}/>
      </section>
      <RelatedVideoList id={id}/>
    </div>
  )
}
