from flask import (Flask, render_template, abort, redirect, url_for)

app = Flask(__name__)
app.debug = True

@app.route("/")
def index():
    return "Hello World"

if (__name__ == "__main__"):
    app.run(use_reloader=False)
