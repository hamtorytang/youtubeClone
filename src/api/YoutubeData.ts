import axios, { AxiosInstance } from "axios";


export default class YoutubeData{
    httpClient: AxiosInstance;

    constructor(){
        this.httpClient = axios.create({
            baseURL: 'https://youtube.googleapis.com/youtube/v3',
            params : { key: process.env.REACT_APP_YOUTUBE_API_KEY }
        })
    }

    async search(keyword:string){
        console.log("SEAARCH",keyword);
        return keyword ? this.#searchByKeyword(keyword) : this.#getPopularVideos();
    }

    async #searchByKeyword(keyword:string){
        console.log('seachbykeyword');
        return this.httpClient
        .get('search', {
            params:{
                part: 'snippet',
                maxResults: 50,
                type: 'video',
                order: 'date',
                q: keyword,
        }})
        .then(res=>res.data.items)
    }

    async #getPopularVideos(){
        console.log('seachbypopular');
        return this.httpClient
        .get('videos', {
            params:{
                part: 'snippet',
                maxResults: 50,
                chart: 'mostPopular',
        }})
        .then(res=>res.data.items.map((element:any)=>({...element, id:{videoId: element.id}})))
    }

    async related(videoId:string){
        console.log('this is just before Related');
        return this.#getRelatedVideos(videoId);
    }

    async #getRelatedVideos(videoId:string){
        console.log('hihi related shit plz');
        return this.httpClient
        .get('search', {params:{
            part: 'snippet',
            maxResults: 20,
            type: 'video',
            order: 'viewCount',
            relatedToVideoId: videoId,
        }})
        .then(res=>res.data.items)
    }

    async description(channelId:string){
        return this.#getChannelDescription(channelId);
    }

    async #getChannelDescription(channelId:string){
        return this.httpClient
        .get('channels', {params:{
            part: 'snippet',
            id: channelId,
        }})
        .then(res=>res.data.items)
    }

} 