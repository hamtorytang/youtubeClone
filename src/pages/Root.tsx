import {useState} from 'react'
import SearchBar from '../components/SearchBar'
import {Outlet} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <div>
      <SearchBar/>
      <QueryClientProvider client={queryClient}>
        <Outlet/>
      </QueryClientProvider>
    </div>
  )
}
