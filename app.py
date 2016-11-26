from flask import (Flask, render_template, request, redirect, url_for)
from flask_googlemaps import GoogleMaps
from flask_googlemaps import Map

app = Flask(__name__)
app.debug = True
# you can set key as config
app.config['GOOGLEMAPS_KEY'] = "AIzaSyBPq_aC_7y3PA4Bim15wIhe8RFRguXEjzw"
# Initialize the extension
GoogleMaps(app)
# you can also pass the key here if you prefer

@app.route("/google2e4c61498b4fdd7f.html")
def googlecheck():
    return render_template("google2e4c61498b4fdd7f.html")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/routesMap", methods=['GET', 'POST'])
def routeMap():
    if (request.method == "POST"):
        return render_template("routesMap.html")
    else:
        return render_template("routesMap.html")

@app.route("/test")
def mapview():
    # creating a map in the view
    mymap = Map(
        identifier="view-side",
        lat=37.4419,
        lng=-122.1419,
        markers=[(37.4419, -122.1419)]
    )
    sndmap = Map(
        identifier="sndmap",
        lat=37.4419,
        lng=-122.1419,
        markers=[
          {
             'icon': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
             'lat': 37.4419,
             'lng': -122.1419,
             'infobox': "<b>Hello World</b>"
          },
          {
             'icon': 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
             'lat': 37.4300,
             'lng': -122.1400,
             'infobox': "<b>Hello World from other place</b>"
          }
        ]
    )
    return render_template('example.html', mymap=mymap, sndmap=sndmap)

if (__name__ == "__main__"):
    app.run(use_reloader=False)
