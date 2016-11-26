from flask import (Flask, render_template, request, redirect, url_for)
app = Flask(__name__)
app.debug = True

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/google2e4c61498b4fdd7f.html")
def googlecheck():
    return render_template("google2e4c61498b4fdd7f.html")

@app.route("/routesMap", methods=['GET', 'POST'])
def routeMap():
    if (request.method == "POST"):
        return render_template("routesMap.html")
    else:
        return render_template("routesMap.html")
if (__name__ == "__main__"):
    app.run(use_reloader=False)
