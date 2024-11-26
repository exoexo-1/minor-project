import React from "react";
import "./albumimage.css";

export default function AlbumImage({ url }) {
  return (
    <div className="albumImage flex">
      <img
        src="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
        alt="album art"
        className="albumImage-art"
      />
      <div className="albumImage-shadow">
        <img src={url} alt="album shadow" className="albumImage-shadow" />
      </div>
    </div>
  );
}
