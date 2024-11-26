import java.sql.*;
import java.util.*;

public class MusicSearch {

    // JDBC URL, username, and password of MySQL server
    static final String DB_URL = "jdbc:mysql://localhost:3306/minor1";
    static final String USER = "root";
    static final String PASS = "Lakshya";

    // List to store all songs and Queue for the next songs to play
    static List<Song> songList = new ArrayList<>();
    static Queue<Song> songQueue = new LinkedList<>();
    static Song currentSong = null;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Fetch all songs from the database and load into the list
        loadSongsFromDatabase();

        // Initial prompt for the user to choose a song to play
        System.out.println("Enter the song name to search:");
        String searchQuery = scanner.nextLine();

        // Call the method to search the song by title (partial match)
        searchSongsByTitle(searchQuery);

        // Prompt for adding songs to the queue or playing a selected song
        System.out.println("Enter the song ID to play it or type 'queue' to add to the queue (or 'done' to stop):");
        while (true) {
            String userInput = scanner.nextLine();
            if (userInput.equalsIgnoreCase("done")) {
                break;
            } else if (userInput.equalsIgnoreCase("queue")) {
                // Handle the queue functionality
                System.out.println("Enter the song name to search and add to the queue (or 'done' to stop):");
                while (true) {
                    String songNameForQueue = scanner.nextLine();
                    if (songNameForQueue.equalsIgnoreCase("done")) {
                        break;
                    }
                    searchSongsByTitleForQueue(songNameForQueue);
                }
            } else {
                try {
                    int songId = Integer.parseInt(userInput);
                    playSongById(songId);
                } catch (NumberFormatException e) {
                    System.out.println("Invalid input. Please enter a valid song ID or 'queue'.");
                }
            }
        }

        // Simulate playing songs from the queue after the current song finishes
        while (!songQueue.isEmpty()) {
            playNextSong();
        }

        scanner.close();
    }

    // Method to load songs from the database into the songList
    public static void loadSongsFromDatabase() {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            // Register JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            // SQL query to get all songs along with artist name and album title
            String sql = "SELECT s.song_id, s.title, s.duration, a.name AS artist_name, al.title AS album_title " +
                         "FROM songs s " +
                         "JOIN artists a ON s.artist_id = a.artist_id " +
                         "JOIN albums al ON s.album_id = al.album_id";
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();

            // Populate the songList with data from the database
            while (rs.next()) {
                int songId = rs.getInt("song_id");
                String songTitle = rs.getString("title");
                String duration = rs.getString("duration");
                String artistName = rs.getString("artist_name");
                String albumTitle = rs.getString("album_title");

                // Create a Song object and add it to the list
                Song song = new Song(songId, songTitle, duration, artistName, albumTitle);
                songList.add(song);
            }
        } catch (SQLException se) {
            // Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            // Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            // Finally block to close resources
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
    }

    // Method to search and display songs by title (partial match by LINEAR SEARCH) 
    public static void searchSongsByTitle(String title) {
        boolean found = false;
        for (Song song : songList) {
            if (song.getTitle().toLowerCase().contains(title.toLowerCase())) {
                // Display the song details
                System.out.println("Song ID: " + song.getSongId());
                System.out.println("Title: " + song.getTitle());
                System.out.println("Duration: " + song.getDuration());
                System.out.println("Album Title: " + song.getAlbumTitle());
                System.out.println("Artist Name: " + song.getArtistName());
                System.out.println("----------------------");
                found = true;
            }
        }

        if (!found) {
            System.out.println("No song found with the title containing: " + title);
        }
    }

    // Method to search and add songs to the queue by title (partial match)
    public static void searchSongsByTitleForQueue(String title) {
        boolean found = false;
        System.out.println("Search Results for '" + title + "':");
        for (Song song : songList) {
            if (song.getTitle().toLowerCase().contains(title.toLowerCase())) {
                // Display the song details
                System.out.println("Song ID: " + song.getSongId());
                System.out.println("Title: " + song.getTitle());
                System.out.println("Duration: " + song.getDuration());
                System.out.println("Album Title: " + song.getAlbumTitle());
                System.out.println("Artist Name: " + song.getArtistName());
                System.out.println("----------------------");
                found = true;
            }
        }

        if (!found) {
            System.out.println("No song found with the title containing: " + title);
        } else {
            System.out.println("Enter the song ID to add to the queue:");
            int songId = Integer.parseInt(new Scanner(System.in).nextLine());
            addSongToQueue(songId);
        }
    }

    // Method to play a song by its ID
    public static void playSongById(int songId) {
        for (Song song : songList) {
            if (song.getSongId() == songId) {
                currentSong = song;
                System.out.println("Currently Playing:");
                System.out.println("Title: " + currentSong.getTitle());
                System.out.println("Duration: " + currentSong.getDuration());
                System.out.println("Album Title: " + currentSong.getAlbumTitle());
                System.out.println("Artist Name: " + currentSong.getArtistName());
                System.out.println("----------------------");
                // Simulate playing the song for its duration
                try {
                    int durationInSeconds = convertDurationToSeconds(currentSong.getDuration());
                    Thread.sleep(durationInSeconds * 1000);  // Simulate the song duration
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                return;
            }
        }
        System.out.println("Song not found with ID: " + songId);
    }

    // Method to add a song to the queue for later playback
    public static void addSongToQueue(int songId) {
        for (Song song : songList) {
            if (song.getSongId() == songId) {
                songQueue.add(song);
                System.out.println("Added " + song.getTitle() + " to the queue.");
                return;
            }
        }
        System.out.println("Song not found with ID: " + songId);
    }

    // Method to simulate playing the next song from the queue
    public static void playNextSong() {
        if (!songQueue.isEmpty()) {
            Song nextSong = songQueue.poll();
            System.out.println("Now Playing (from Queue):");
            System.out.println("Title: " + nextSong.getTitle());
            System.out.println("Duration: " + nextSong.getDuration());
            System.out.println("Album Title: " + nextSong.getAlbumTitle());
            System.out.println("Artist Name: " + nextSong.getArtistName());
            System.out.println("----------------------");
            // Simulate playing the song for its duration
            try {
                int durationInSeconds = convertDurationToSeconds(nextSong.getDuration());
                Thread.sleep(durationInSeconds * 1000);  // Simulate the song duration
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("No more songs in the queue.");
        }
    }

    // Utility method to convert a song duration in format "mm:ss" to seconds
    public static int convertDurationToSeconds(String duration) {
        String[] parts = duration.split(":");
        int minutes = Integer.parseInt(parts[0]);
        int seconds = Integer.parseInt(parts[1]);
        return minutes * 60 + seconds;
    }
}

// A simple Song class to represent a song

class Song {
    
    private int songId;
    private String title;
    private String duration;
    private String artistName;
    private String albumTitle;

    public Song(int songId, String title, String duration, String artistName, String albumTitle) {
        this.songId = songId;
        this.title = title;
        this.duration = duration;
        this.artistName = artistName;
        this.albumTitle = albumTitle;
    }

    public int getSongId() {
        return songId;
    }

    public String getTitle() {
        return title;
    }

    public String getDuration() {
        return duration;
    }

    public String getArtistName() {
        return artistName;
    }

    public String getAlbumTitle() {
        return albumTitle;
    }
}
