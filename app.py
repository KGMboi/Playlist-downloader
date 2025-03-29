from flask import Flask,render_template,request,send_file
import base64
import requests
import base64
import os
import subprocess
import shutil

app = Flask(__name__)

@app.route("/")
def root():
    return render_template("test.html")


@app.route("/download_playlist", methods = ['POST'] )
def download_playlist():
    
    url  = request.json['url']

    
    output_dir = os.path.join("downloads")
    os.makedirs(output_dir, exist_ok=True)

    try:
        subprocess.run(["spotdl", url, "--output", output_dir], check=True)
        zip_path = shutil.make_archive(output_dir, 'zip', output_dir)
        return send_file(zip_path, as_attachment=True)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    app.run(debug=True)
