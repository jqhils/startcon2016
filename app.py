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
    return render_template("index.html",  toForm = 0, fromForm = 0)

@app.route("/routesMap", methods=['GET', 'POST'])
def routeMap():
    dest = {}
    dest['from'] = None
    dest['to'] = None
    print("the request method was", request.method)
    if (request.method == "POST"):
        try:
            print("got to trying")
            print("from is") 
            fromForm = str(request.form['destFrom'])
            toForm = str(request.form['destTo'])
            fromLoc = geolocator.geocode(request.form['destFrom'])
            toLoc = geolocator.geocode(request.form['destTo'])
            dest['from'] = fromLoc
            dest['to'] = toLoc
        except:
            print "Failed to read off input"
            return redirect(url_for('index'))
        print("got dest")
        return render_template("routesMap.html", dest=dest, toForm = toForm, fromForm = fromForm)
    else:
        print("it was no destination")
        return render_template("routesMap.html", dest = dest, toForm = 0, fromForm = 0)


if (__name__ == "__main__"):
    app.run(debug=True)
