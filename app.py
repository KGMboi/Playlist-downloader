from flask import Flask,render_template,request,send_file,redirect,url_for
import base64
import requests
import base64
import os
import subprocess
import shutil
import uuid

app = Flask(__name__)


@app.route("/")
def root():
    return render_template("test.html")



@app.route("/download_playlist", methods = ['POST'] )
def download_playlist():
    data = request.json
    url = data['url']
    name = data['name']
    print(url)
    dir = f"downloads/{name}"
    os.makedirs(dir)
    
    #api CLI (command line interface)
    subprocess.run(["spotdl", url, "--output", dir], check=True)

    unique_id = str(uuid.uuid4())    
    rt = os.path.join(os.getcwd(),"downloads",name)
    print(rt)
    route = shutil.make_archive(unique_id,"zip",rt)

    shutil.rmtree(dir)
    return send_file(route,as_attachment=True,download_name=name)





@app.route("/test")
def test():
    print("hola")
    


if __name__ == "__main__":
    app.run(debug=True)
