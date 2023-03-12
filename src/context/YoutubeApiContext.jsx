import { createContext, useContext } from "react";
import FakeYoutube from "../api/FakeYoutube";
import YoutubeData from "../api/YoutubeData";

export const YoutubeApiContext = createContext()

const youtube = new YoutubeData();

export function YoutubeApiProvider({children}){
    return(
        <YoutubeApiContext.Provider value={{youtube}}>
            {children}
        </YoutubeApiContext.Provider>
    )
}

export function useYoutubeApi (){
    return useContext(YoutubeApiContext);
}