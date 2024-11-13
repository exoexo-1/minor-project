import React from 'react';
import './sidebar.css';
import SidebarButton from './sidebarbutton';
import { FaHome, FaSearch, FaHeart, FaRss, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className='sidebar-container'>
      <img 
        src='https://i.pinimg.com/236x/9a/00/33/9a00339e7f3084be846610ccc9b64708.jpg' 
        className='profile-img' 
        alt='User profile image' 
      />
      <div>
        <SidebarButton title='Home' to='/library' icon={<FaHome />} />
        <SidebarButton title='Search' to='/search' icon={<FaSearch />} />
        <SidebarButton title='Feed' to='/feed' icon={<FaHeart />} />
        <SidebarButton title='Favorites' to='/favorite' icon={<FaRss />} />
      </div>
      <SidebarButton title='Sign Out' to='/signout' icon={<FaSignOutAlt />} />
    </div>
  );
}
