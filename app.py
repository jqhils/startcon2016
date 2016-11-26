from flask import (Flask, render_template, request, redirect, url_for)
app = Flask(__name__)
app.debug = True

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/routesMap", methods=['GET', 'POST'])
def routeMap():
    if (request.method == "POST"):
        return render_template("routesMap.html")
    else:
        return render_template("routesMap.html")
if (__name__ == "__main__"):
    app.run(use_reloader=False)
