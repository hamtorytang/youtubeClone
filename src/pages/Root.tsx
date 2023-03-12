import {useState} from 'react'
import SearchBar from '../components/SearchBar'
import {Outlet} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YoutubeApiProvider } from '../context/YoutubeApiContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();

export default function Root() {
  return (
    <div>
      <SearchBar/>
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet/>
          <ReactQueryDevtools initialIsOpen={true}/>
        </QueryClientProvider>
      </YoutubeApiProvider>
    </div>
  )
}
