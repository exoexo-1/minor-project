package com.example.minorproject.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class SongController {

    @Autowired
    private SongRepository songRepository;

    // Search songs by title
    @GetMapping("/search")
    public List<Song> searchSongs(@RequestParam String query) {
        return songRepository.findByTitleContainingIgnoreCase(query);
    }

    // Fetch all songs
    @GetMapping("/all")
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    @GetMapping("/next/{songId}")
    public Song getNextSong(@PathVariable int songId) {
        List<Song> songs = songRepository.findAll();
        int index = 0;
        for (int i = 0; i < songs.size(); i++) {
            if (songs.get(i).getSongId() == songId) {
                index = i;
                break;
            }
        }
        // Get next song, wrap around if at the end
        return songs.get((index + 1) % songs.size());
    }

    @GetMapping("/previous/{songId}")
    public Song getPreviousSong(@PathVariable int songId) {
        List<Song> songs = songRepository.findAll();
        int index = 0;
        for (int i = 0; i < songs.size(); i++) {
            if (songs.get(i).getSongId() == songId) {
                index = i;
                break;
            }
        }
        // Get previous song, wrap around if at the start
        return songs.get((index - 1 + songs.size()) % songs.size());
    }
}