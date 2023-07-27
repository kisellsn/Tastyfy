import json
import time
import requests
from flask import Flask, request, redirect, render_template, session, url_for, jsonify
from backend.spotify_requests import spotify
from backend.analysis import analysis
#from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'some secret key ;)'
#CORS(app)
# ----------------------- AUTH -------------------------

@app.route("/api/auth")
def auth():
    return redirect(spotify.AUTH_URL)


@app.route("/callback/")
def callback():
    auth_token = request.args['code']
    auth_header,refresh_header,ex = spotify.authorize(auth_token)
    session['auth_header'] = auth_header
    session['refresh_token']=refresh_header
    #return jsonify({
    #    "profile": url_for('profile')
    #})
    return redirect(url_for('profile'))


def valid_token(resp):
    return resp is not None and not 'error' in resp


# -------------------------- API REQUESTS ----------------------------


@app.route("/")
def index():
    return redirect("/api/auth")

@app.route('/api/profile')
def profile():
    if 'auth_header' in session:
        auth_header = session['auth_header']

        profile_data = spotify.get_current_profile(auth_header)

        recently_played = spotify.get_recently_played(auth_header)


        genres = spotify.get_user_genres(auth_header)
        genre = analysis.convert_genres(genres).loc[0, 'Genre']
        country = "United States"


        print(genre)
        search = spotify.search(auth_header, name=f"{country} trending {genre}", search_type="playlist", limit=1)

        resp = search["playlists"]
        rec = []
        tracks = spotify.get_playlists_tracks(auth_header, resp, 50)
        for track in tracks:
            rec.extend(item["track"] for item in track["items"])

        analysis.get_smarter_recommendations(rec)
        image, best, f = analysis.visualize_features(spotify.get_audio_features(auth_header))
        new_best = spotify.new_dict_track_by_features(auth_header, best)

        data = spotify.search(auth_header, "poor infoturnate soul ", limit=15)
        print(data)
        items = data["track" + 's']['items']
        print(items)

        if valid_token(recently_played):
            return jsonify({
                "user": profile_data,
                "rec": rec,
                "new_best": new_best
            })
    return jsonify({
        "index": url_for('index')
    })

def is_valid_json(obj):
    try:
        json.dumps(obj)
        return True
    except ValueError:
        return False

@app.route('/api/search')
def search():
    try:
        name = request.args['name']
        return make_search(name)
    except:
        return render_template('search.html')
def make_search(name):
    if 'auth_header' in session:
        auth_header = session['auth_header']
        data = spotify.search(auth_header, name)
        api_url = data["track" + 's']['href']
        items = data["track" + 's']['items']

        return jsonify({
            "name": name,
            "results": items,
            "api_url":api_url
        })
    return redirect(url_for('index'))

@app.route("/api/logout")
def logout():
    return redirect(url_for('index'))


if __name__ == "__main__":
    app.run(debug=True, port=spotify.SERVER_PORT)
