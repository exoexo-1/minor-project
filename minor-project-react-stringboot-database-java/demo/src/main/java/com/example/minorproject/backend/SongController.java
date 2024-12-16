package com.example.minorproject.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Paths;
import java.nio.file.Path;
import java.net.MalformedURLException;
import java.util.*;

// Controller for song-related endpoints
@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class SongController {

    @Autowired
    private SongRepository songRepository;

    // Stack to store recent search queries (limit to 5)
    private LinkedList<SearchHistory> recentSearches = new LinkedList<>();

    // Search songs by title
    @GetMapping("/search")
    public List<Song> searchSongs(@RequestParam String query) {
        List<Song> searchResults = songRepository.findByTitleContainingIgnoreCase(query);

        // Store search query and its results in recent searches (limit to 5)
        if (recentSearches.size() >= 5) {
            recentSearches.removeFirst(); // Remove the oldest search if more than 5
        }
        recentSearches.add(new SearchHistory(query, searchResults));

        return searchResults;
    }

    // Get recent searches (last 5)
    @GetMapping("/recent-searches")
    public List<SearchHistory> getRecentSearches() {
        return new ArrayList<>(recentSearches);
    }

    // Get all songs
    @GetMapping("/all")
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    // Get next song
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

    // Get previous song
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

    // Serve audio file
    @GetMapping("/songs/{fileName:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getSong(@PathVariable String fileName) {
        try {
            // Only use the file name, no full path
            Path file = Paths.get("C:/minor1/music files mp3/").resolve(fileName).normalize();
            Resource resource = new UrlResource(file.toUri());

            // Check if file exists
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // SearchHistory class to store query and its results
    public static class SearchHistory {
        private String query;
        private List<Song> results;

        public SearchHistory(String query, List<Song> results) {
            this.query = query;
            this.results = results;
        }

        public String getQuery() {
            return query;
        }

        public List<Song> getResults() {
            return results;
        }
    }
}
