from flask import Flask,render_template,request
import base64
import requests
import base64

app = Flask(__name__)

@app.route("/")
def root():
    return render_template("test.html")


@app.route("/download_playlist", methods = ['POST'])
def download_playlist():
    url  = request.json['url']

    


if __name__ == "__main__":
    app.run(debug=True)
