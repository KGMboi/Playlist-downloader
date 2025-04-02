# Spotify Playlist Downloader

Spotify Playlist Downloader is a web application that allows users to download their Spotify playlists as ZIP files. It also features a fun cat GIF display while the playlist is being downloaded.

## Features

- Search for Spotify playlists by username.
- Download playlists as ZIP files.
- Displays a random cat GIF while downloading.
- Responsive and visually appealing design.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Python (Flask)
- **APIs**:
  - Spotify Web API
  - The Cat API
- **CLI Tool**: [spotDL](https://github.com/spotDL/spotify-downloader)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd spoopefy/Playlist-downloader
   ```

2. Install Python dependencies:
   ```bash
   pip install flask requests
   ```

3. Install `spotDL`:
   ```bash
   pip install spotdl
   ```

4. Set up The Cat API key:
   - Visit [The Cat API](https://thecatapi.com/) and generate an API key.
   - Replace the placeholder API key in `test.js` with your own.

## Usage

1. Start the Flask server:
   ```bash
   python app.py
   ```

2. Open your browser and navigate to `http://127.0.0.1:5000`.

3. Enter your Spotify username in the search bar and click "Search".

4. Browse the displayed playlists and click "Download" to download a playlist.

5. A modal with a random cat GIF will appear while the playlist is being processed.

## File Structure

- **`app.py`**: Backend logic for handling routes and downloading playlists.
- **`templates/test.html`**: HTML template for the frontend.
- **`static/test.css`**: CSS for styling the application.
- **`static/test.js`**: JavaScript for handling frontend logic and API calls.

## API Details

### Spotify Web API
- Used to fetch playlists for a given Spotify username.
- Requires `client_id` and `client_secret` for authentication.

### The Cat API
- Used to fetch random cat GIFs.
- Requires an API key.

## Known Issues

- Ensure that the `spotDL` CLI tool is installed and configured correctly.
- The application assumes that the Spotify username is valid and has public playlists.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [The Cat API](https://thecatapi.com/)
- [spotDL](https://github.com/spotDL/spotify-downloader)