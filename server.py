import os
import requests
import subprocess
import shutil
import uuid
from flask import Flask, request, jsonify, redirect, session, send_file, render_template

# Flask setup
app = Flask(__name__, template_folder="templates")
app.secret_key = "your_secret_key"  # Change this for security

# Spotify API credentials
SPOTIFY_CLIENT_ID = "8990dec5bcb04b5ca5ca645f5d97b0c2"
SPOTIFY_CLIENT_SECRET = "8597d095699444ba8dcdfa9821cbf0e1"
SPOTIFY_REDIRECT_URI = "http://127.0.0.1:5000/callback"
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_URL = "https://api.spotify.com/v1"
DOWNLOAD_FOLDER = "downloads"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

# Spotify authentication (OAuth)
@app.route("/login")
def login():
    scope = "playlist-read-private playlist-read-collaborative"
    auth_url = (
        f"{SPOTIFY_AUTH_URL}?client_id={SPOTIFY_CLIENT_ID}&response_type=code"
        f"&redirect_uri={SPOTIFY_REDIRECT_URI}&scope={scope}"
    )
    return redirect(auth_url)

@app.route("/callback")
def callback():
    code = request.args.get("code")
    if not code:
        return "Error: No code received", 400

    token_data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": SPOTIFY_REDIRECT_URI,
        "client_id": SPOTIFY_CLIENT_ID,
        "client_secret": SPOTIFY_CLIENT_SECRET,
    }

    response = requests.post(SPOTIFY_TOKEN_URL, data=token_data)
    token_json = response.json()

    if "access_token" not in token_json:
        return "Error getting access token", 400

    session["access_token"] = token_json["access_token"]
    return redirect("/")

def get_user_playlists():
    if "access_token" not in session:
        return {"error": "User not authenticated"}

    headers = {"Authorization": f"Bearer {session['access_token']}"}
    response = requests.get(f"{SPOTIFY_API_URL}/me/playlists", headers=headers)

    if response.status_code != 200:
        return {"error": "Failed to fetch playlists"}

    playlists = [
        {
            "id": p["id"],
            "name": p["name"],
            "url": p["external_urls"]["spotify"],
            "image": p["images"][0]["url"] if p["images"] else None,
        }
        for p in response.json().get("items", [])
    ]

    return {"playlists": playlists}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/search_user")
def search_user():
    data = get_user_playlists()
    return jsonify(data)

@app.route("/api/download", methods=["POST"])
def download():
    data = request.get_json()
    playlist_url = data.get("url")
    if not playlist_url:
        return jsonify({"error": "Playlist URL required"}), 400

    unique_id = str(uuid.uuid4())
    output_dir = os.path.join(DOWNLOAD_FOLDER, unique_id)
    os.makedirs(output_dir, exist_ok=True)

    try:
        subprocess.run(["spotdl", playlist_url, "--output", output_dir], check=True)
        zip_path = shutil.make_archive(output_dir, 'zip', output_dir)
        return send_file(zip_path, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
