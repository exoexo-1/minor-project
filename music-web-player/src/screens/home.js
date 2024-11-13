import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from "./library"; // Make sure `Library` is the correct name and path of the component
import Search from "./search";
import Feed from "./feed";
import Favorite from "./favorite";
import './home.css';
import ReactAudioPlayer from 'react-audio-player';
import Sidebar from '../components/sidebar';
import AudioPlayer from "../components/player/audioplayer";
function Home() {
  return (
      <Router>
        <div className="main-body">
        <Sidebar />
            <Routes>
                <Route path='/library' element={<Library />} />
                <Route path='/search' element={<Search />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/favorite' element={<Favorite />} />
            </Routes>
            </div>
      </Router>
   
  );
}

export default Home;