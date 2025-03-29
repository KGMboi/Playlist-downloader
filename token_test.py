import requests
import base64

client_id = "8990dec5bcb04b5ca5ca645f5d97b0c2"
client_secret = "8597d095699444ba8dcdfa9821cbf0e1"

# Encode credentials
auth_header = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()

response = requests.post(
    "https://accounts.spotify.com/api/token",
    data={"grant_type": "client_credentials"},
    headers={
        "Authorization": f"Basic {auth_header}",
        "Content-Type": "application/x-www-form-urlencoded",
    },
)

access_token = response.json()["access_token"]
print("Access Token:", access_token)