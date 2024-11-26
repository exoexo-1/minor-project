import React from 'react';
import './sidebar.css';
import SidebarButton from './sidebarbutton';
import { FaHome, FaSearch, FaHeart, FaRss, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className='sidebar-container'>
      <img 
        src='https://i.pinimg.com/736x/8c/1a/5a/8c1a5a715ec3e02d9a330ddd13a6cf63.jpg' 
        className='profile-img' 
        alt='User profile image' 
        
      />
      <div>
        <SidebarButton title='Home' to='/library' icon={<FaHome />} />
        <SidebarButton title='Search' to='/search' icon={<FaSearch />} />
        <SidebarButton title='Feed' to='/feed' icon={<FaRss />} />
        <SidebarButton title='Favorites' to='/favorite' icon={<FaHeart />} />
      </div>
      <SidebarButton title='Sign Out' to='/signout' icon={<FaSignOutAlt />} />
    </div>
  );
}
