from flask import (Flask, render_template, request, redirect, url_for)
# from flask_googlemaps import GoogleMaps
# from flask_googlemaps import Map

import geopy
from geopy.geocoders import Nominatim

app = Flask(__name__)
app.debug = True

geolocator = Nominatim()

@app.route("/google2e4c61498b4fdd7f.html")
def googlecheck():
    return render_template("google2e4c61498b4fdd7f.html")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/routesMap", methods=['GET', 'POST'])
def routeMap():
    dest = {}
    dest['from'] = None
    dest['to'] = None
    if (request.method == "POST"):
        try:
            fromLoc = geolocator.geocode(request.form['destFrom'])
            toLoc = geolocator.geocode(request.form['destTo'])
            dest['from'] = fromLoc
            dest['to'] = toLoc
        except:
            print "Failed to read off input"
            return redirect(url_for('index'))
        return render_template("routesMap.html", dest=dest)
    else:
        return render_template("routesMap.html")


if (__name__ == "__main__"):
    app.run(debug=True)
