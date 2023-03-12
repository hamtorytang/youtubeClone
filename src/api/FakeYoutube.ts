import axios from "axios";

export default class FakeYoutube {

    async search(keyword:string){
        return keyword ? this.#searchByKeyword() : this.#getPopularVideos();
    }
    
    async relatedList(videoId:string){
        return this.#getRelatedList();
    }

    async description(channelId:string){
        return this.#getDescription();
    }

    async #getDescription(){
        return axios.get('/data/description.json')
        .then(res=>res.data.items);
    }

    async #getRelatedList(){
        return axios.get('/data/relatedlist.json')
        .then(res=>res.data.items);
    }

    async #searchByKeyword(){
        console.log('adasd')
        return axios.get('/data/youtube.json')
        .then(res=>res.data.items);
    }

    async #getPopularVideos(){
        console.log('adasd')
        return axios.get('/data/popular.json')
        .then(res=>res.data.items.map((element:any)=>({...element, id:{videoId: element.id}})));
    }

} 