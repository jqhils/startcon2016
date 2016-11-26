from flask import (Flask, render_template, abort, redirect, url_for)

app = Flask(__name__)
app.debug = True

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/routesMap")
def routeMap():
    return render_template("routesMap.html")
if (__name__ == "__main__"):
    app.run(use_reloader=False)
