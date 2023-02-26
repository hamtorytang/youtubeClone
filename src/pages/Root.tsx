import {useState} from 'react'
import SearchBar from '../components/SearchBar'
import {Outlet} from 'react-router-dom';
export default function Root() {
  return (
    <div>
      <SearchBar/>
      <Outlet/>
    </div>
  )
}
