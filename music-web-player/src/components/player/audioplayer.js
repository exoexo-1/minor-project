import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

function AudioPlayer({ songUrl }) {
    return (
        <ReactAudioPlayer
            src={songUrl}
            controls
        />
    );
}

export default AudioPlayer;