



from flask import Flask,send_file



app = Flask(__name__)

@app.route("/")
def test():
    title = "test"

    title = title.replace(" ", "_")

    return send_file(f"downloads\{title}.zip",as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)