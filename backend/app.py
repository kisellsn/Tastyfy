import base64
import webbrowser

from flask import Flask, request, redirect, render_template, session, url_for, jsonify, make_response
from backend.spotify_requests import spotify
from backend.analysis import analysis
from flask_cors import CORS
app = Flask(__name__)
app.secret_key = 'some secret key ;)'
CORS(app)
# ----------------------- AUTH -------------------------

@app.route("/api/auth")
def auth():
     return jsonify({
         "link": spotify.AUTH_URL
     })
     #return redirect(spotify.AUTH_URL)

@app.route("/callback/")
def callback():
    if 'code' in request.args:
        auth_token = request.args['code']
        auth_header, refresh_header = spotify.authorize(auth_token)
        session['auth_header'] = auth_header
        session['refresh_token'] = refresh_header
        return redirect("http://localhost:3000/menu")
    return redirect("http://localhost:3000/")


def valid_token(resp):
    return resp is not None and not 'error' in resp

@app.route("/token")
def get_code():
    if 'auth_header' in session:
        if valid_token(spotify.get_current_profile(session["auth_header"])):
            return make_response(jsonify(session['auth_header']), 200)
    session.clear()
    return make_response('the token has expired',403)

# -------------------------- API REQUESTS ----------------------------


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/api/user')
def get_profile():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        profile_data = spotify.get_current_profile(auth_header)
        res = make_response(profile_data, 200)
        # res.set_cookie('auth_header', auth_header)

    else: res = make_response("token not in session", 401)
    return res


@app.route('/api/user/diagram', methods=('GET', 'POST'))
def diagram():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        if request.method == 'POST':
            data = request.json
            term = data.get('term')
            if term in ('medium_term', 'short_term', 'long_term'):
                top = spotify.get_top_items(auth_header, 'tracks',term=term)  # tracks/artists
                if len(top['items'])<1: return make_response("not enough data", 204)
                fig = analysis.visualize_top_artists(top,is_top=True)
            elif term == 'current':
                recently_played = spotify.get_recently_played(auth_header)
                tracks = tuple((track['track'] for track in recently_played['items']))
                if len(tracks) < 1: return make_response("not enough data", 204)
                fig = analysis.visualize_top_artists(recently_played)
            res = make_response(fig, 200)

    else: res = make_response("token not in session", 401)
    return res

@app.route('/api/user/top', methods=('GET', 'POST'))
def top_artists():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        if request.method == 'POST':
            data = request.json
            term = data.get('term')
            if term in ('medium_term', 'short_term', 'long_term'):
                top_items = spotify.get_top_items(auth_header, 'tracks', term=term)  # tracks/artists
                if len(top_items["items"]) < 1: return make_response("not enough data", 204)
                top_ids = analysis.get_history_top_artists(top_items, is_top=True)
                top = spotify.get_several_artists(auth_header, [item for sublist in top_ids for item in sublist])
                res = make_response(jsonify(top["artists"][0:6]), 200)
            elif term == 'current':
                recently_played = spotify.get_recently_played(auth_header)
                tracks = tuple((track['track'] for track in recently_played['items']))
                if len(tracks) < 1: return make_response("not enough data", 204)
                top_ids = analysis.get_history_top_artists(recently_played)
                top = spotify.get_several_artists(auth_header, [item for sublist in top_ids for item in sublist])
                res = make_response(jsonify(top["artists"][0:6]), 200)
            else: res = make_response("need 'medium_term', 'short_term', 'long_term' or 'current'", 400)

    else: res = make_response("token not in session", 401)
    return res

@app.route('/api/user/top_genres')
def top_genres():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        genres = spotify.get_user_genres(auth_header)
        if len(genres)<1: return make_response("not enough data", 204)
        fig = analysis.visualize_genres_barchart(genres)
        res = make_response(fig, 200)
    else: res = make_response("token not in session", 401)
    return res

@app.route('/api/user/text')
def get_text():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        genres = spotify.get_user_genres(auth_header)
        if len(genres)<1: return make_response("not enough data", 204)
        text = analysis.generate_genres_text(genres)
        res = make_response(text, 200)
    else: res = make_response("token not in session", 401)
    return res



@app.route('/api/user/recommendations', methods=('GET', 'POST'))
def recommendations():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        if request.method == 'POST':
            data = request.json
            market = data.get('code')
            genres = spotify.get_user_genres(auth_header)
            first_genre = analysis.convert_genres(genres).loc[0, 'Genre'].split()
            genre_name = next((word for word in first_genre if word.lower() in spotify.music_genres), None)
            search = spotify.search(auth_header, name=f"{market.split('_')[0]} trending {genre_name} ",
                                    search_type="playlist", limit=1, market=market.split('_')[1])
            resp = search["playlists"]
            tracks = []
            playlists_items=spotify.get_playlists_tracks(auth_header, resp, 50)
            for track in playlists_items:
                tracks.extend(item["track"] for item in track["items"])

            tracks_ids = analysis.get_smarter_recommendations(tracks)
            recommendations = spotify.get_several_tracks(auth_header, tracks_ids)
            res = make_response(recommendations["tracks"], 200)

        else:
            recommendations = spotify.get_recommendations(auth_header, limit=9, t_count=2, a_count=1, g_count=2)
            res = make_response(jsonify(recommendations["tracks"]), 200)
    else:
        res = make_response("token not in session", 401)
    return res


@app.route("/api/user/rose_chart")
def rose_chart():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        image, best = analysis.visualize_features(spotify.get_audio_features(auth_header))
        new_best = spotify.new_dict_track_by_features(auth_header, best)
        return make_response(jsonify({
            "image": base64.b64encode(image).decode('utf-8'),
            "best": new_best
        }), 200)
    else:
        res = make_response("token not in session", 401)



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
    return make_response("token not in session", 401)


@app.route("/logout")
def logout():
    session.clear()
    url = 'https://www.spotify.com/logout'
    webbrowser.open(url, new=2)
    return make_response("successful logout", 200)


if __name__ == "__main__":
    app.run(host="localhost", port=spotify.SERVER_PORT, debug=True)
