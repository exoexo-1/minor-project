import React from "react";
import AudioPlayer from "../components/player/audioplayer";
import AlbumImage from "../components/player/albumimage";
import "./library.css";

function Library() {
  return (
    <div className="screen-container">
      <div className="album-container">
        <AlbumImage />
      </div>
      <AudioPlayer />
    </div>
  );
}

export default Library;
