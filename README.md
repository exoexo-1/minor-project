Here’s a **README.md** file for your project:

---

# **Music Streaming App**

A music streaming web application created as a minor project using **React**, **Spring Boot**, and **MySQL**. This project integrates a dynamic frontend, a robust backend, and a relational database to provide functionalities such as searching, playing, and queuing songs.

---

## **Features**

### **Frontend (React)**
- **Search Songs**: Dynamically search for songs by title or artist.
- **Recent Searches and Plays**: Displays recently searched and recently played songs.
- **Audio Player**:
  - Play, pause, next, and previous song controls.
  - Displays song title, artist name, and playback progress.
  - Seamlessly fetches random songs if no song is selected.
- **Dynamic Navigation**: Redirects to the library after selecting a song from the search results.
- **Responsive Design**: Ensures optimal user experience across devices.

### **Backend (Spring Boot)**
- REST API to interact with the database.
- Fetch all songs, search songs by title, and retrieve next/previous songs.
- Handles file serving for MP3 files stored locally.
- Robust error handling and cross-origin support for React frontend.

### **Database (MySQL)**
- Stores song metadata such as:
  - Song ID, title, artist ID, file path, duration, album ID, and genre ID.
- Ensures efficient search and retrieval of songs.
- Local MP3 files are stored in `C:/minor1/music files mp3/`.

---

## **Technologies Used**

### **Frontend**
- **React**: For building the dynamic user interface.
- **CSS**: Custom styling for components.
- **Axios**: For making API requests.
- **React Router**: For navigation between screens.

### **Backend**
- **Spring Boot**: For creating the RESTful API.
- **Java**: Core logic for server-side functionalities.

### **Database**
- **MySQL**: Relational database for storing song data.
- **JPA/Hibernate**: For ORM and seamless database integration.

---

## **Project Structure**

### **Frontend**
Located in the `music-web-player/` directory.
- **Components**: 
  - `audioplayer.js`: Handles the audio player's functionality.
  - `search.js`: Implements the search screen.
  - `PlaylistCard.js`, `sidebar.js`: Additional UI components.
- **Screens**: Home, feed, favorites, and library screens.

### **Backend**
Located in the `minor-project-react-stringboot-database-java/demo/src/main/java/com/example/minorproject/backend/` directory.
- **`Song.java`**: Entity class for song metadata.
- **`SongController.java`**: REST controller for handling API endpoints.
- **`SongRepository.java`**: Repository interface for database operations.

### **Database**
- Table: `songs`
- Columns:
  - `song_id`: Primary key.
  - `title`: Name of the song.
  - `file_path`: Path to the MP3 file.
  - Other metadata: `artist_id`, `album_id`, `duration`.

---

## **How to Run**

### **Backend**
1. Ensure MySQL is running and create a database named `minor1`.
2. Update the database connection in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/minor1
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   spring.resources.static-locations=file:///C:/minor1/music%20files%20mp3/
   ```
3. Place MP3 files in `C:/minor1/music files mp3/`.
4. Run the Spring Boot application using your IDE or `mvn spring-boot:run`.

### **Frontend**
1. Navigate to the `music-web-player/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open the app in your browser: [http://localhost:3000](http://localhost:3000).

---

## **API Endpoints**
- **Search Songs**: `GET /api/songs/search?query=<query>`
- **Get All Songs**: `GET /api/songs/all`
- **Get Next Song**: `GET /api/songs/next/{songId}`
- **Get Previous Song**: `GET /api/songs/previous/{songId}`

---

## **Screenshots**




https://github.com/user-attachments/assets/f16d338f-360a-4ec9-b9e4-c1ee10d805e1



### Search Screen
Search for songs, view recent searches, and play songs directly.

---

## **Future Enhancements**
- Implement a queue system for managing song playback.
- Add user authentication and personalized playlists.
- Enhance the UI with animations and theme support.

---

## **Contributors**
- [Lakshya Agrawal] 
- [Upes]

