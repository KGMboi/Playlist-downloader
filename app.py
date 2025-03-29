from flask import Flask,render_template
import base64
import requests
import base64

app = Flask(__name__)


client_id = "8990dec5bcb04b5ca5ca645f5d97b0c2"
client_secret = "8597d095699444ba8dcdfa9821cbf0e1"


def get_auth_token():

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
    return access_token

auth_token = get_auth_token()

@app.route("/")
def root():
    return render_template("test.html")



if __name__ == "__main__":
    app.run(debug=True)
