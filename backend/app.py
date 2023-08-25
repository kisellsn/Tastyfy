import base64
import io
import webbrowser
from datetime import timedelta, datetime
from PIL import Image
from flask import Flask, request, session, jsonify, make_response, redirect

from spotify_requests import spotify
from analysis import analysis

app = Flask(__name__, static_folder="../frontend/build", static_url_path='')
app.secret_key = 'some secret key ;)'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=24)



@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')

# ----------------------- AUTH -------------------------

@app.route("/api/auth")
def auth():
    return jsonify({
        "link": spotify.AUTH_URL
    })


@app.route("/callback/")
def callback():
    auth_token = request.args['code']
    auth_header, refresh_token, expires_at = spotify.authorize(auth_token)
    session['auth_header'] = auth_header
    session['refresh_token'] = refresh_token
    session['expires_at'] = expires_at
    session.permanent = True
    return redirect("/menu")


@app.route("/api/token")
def get_code():
    if 'auth_header' in session:
        if session['expires_at'].replace(tzinfo=datetime.today().tzinfo) - datetime.today() <= timedelta(hours=1):
            auth_header, refresh_token, expires_at = spotify.get_refresh_token(session['refresh_token'])
            session['auth_header'] = auth_header
            session['expires_at'] = expires_at
            return make_response('new token was created', 201)
    session.clear()
    return make_response('the token has expired', 401)


# -------------------------- API REQUESTS ----------------------------

@app.route('/api/user')
def get_profile():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        profile_data = spotify.get_current_profile(auth_header)
        res = make_response(profile_data, 200)
    else:
        res = make_response("token not in session", 401)
    return res


@app.route('/api/user/diagram', methods=('GET', 'POST'))
def diagram():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        if request.method == 'POST':
            data = request.json
            term = data.get('term')
            if term in ('medium_term', 'short_term', 'long_term'):
                top = spotify.get_top_items(auth_header, 'tracks', term=term)  # tracks/artists
                if len(top['items']) < 1: return make_response("not enough data", 204)
                fig = analysis.visualize_top_artists(top, is_top=True)
            elif term == 'current':
                recently_played = spotify.get_recently_played(auth_header)
                tracks = tuple((track['track'] for track in recently_played['items']))
                if len(tracks) < 1: return make_response("not enough data", 204)
                fig = analysis.visualize_top_artists(recently_played)
            res = make_response(fig, 200)

    else:
        res = make_response("token not in session", 401)
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
                top = spotify.get_several_artists(auth_header, top_ids)
                res = make_response(jsonify(top["artists"]), 200)
            elif term == 'current':
                recently_played = spotify.get_recently_played(auth_header)
                tracks = tuple((track['track'] for track in recently_played['items']))
                if len(tracks) < 1: return make_response("not enough data", 204)
                top_ids = analysis.get_history_top_artists(recently_played)
                top = spotify.get_several_artists(auth_header, top_ids)
                res = make_response(jsonify(top["artists"]), 200)
            else:
                res = make_response("need 'medium_term', 'short_term', 'long_term' or 'current'", 400)

    else:
        res = make_response("token not in session", 401)
    return res


@app.route('/api/user/top_genres')
def top_genres():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        genres = get_genres(auth_header)
        if genres is None: return make_response("not enough data", 204)

        fig = analysis.visualize_genres_barchart(genres)
        res = make_response(fig, 200)
    else:
        res = make_response("token not in session", 401)
    return res


@app.route('/api/user/genres_overview')
def get_genres_overview():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        genres = get_genres(auth_header)
        if genres is None: return make_response("not enough data", 204)
        text = analysis.generate_genres_text(genres)
        res = make_response(text, 200)
    else:
        res = make_response("token not in session", 401)
    return res


@app.route('/api/user/recommendations', methods=('GET', 'POST'))
def rec():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        if request.method == 'POST':
            data = request.json
            market = data.get('code')
            genres = get_genres(auth_header)
            if genres is None: return make_response("not enough data", 204)
            first_genre = analysis.convert_genres(genres).loc[0, 'Genre'].split()
            genre_name = next((word for word in first_genre if word.lower() in spotify.music_genres), None)
            search = spotify.search(auth_header, name=f"{market.split('_')[0]} trending {genre_name} ",
                                    search_type="playlist", limit=1)
            resp = search["playlists"]
            tracks = []
            playlists_items = spotify.get_playlists_tracks(auth_header, resp, 50)
            for track in playlists_items:
                tracks.extend(item["track"] for item in track["items"])
            print(tracks)
            tracks_ids = analysis.get_smarter_recommendations(tracks)
            recommendations = spotify.get_several_tracks(auth_header, tracks_ids)
            res = make_response(recommendations["tracks"], 200)

        else:
            recommendations = spotify.get_recommendations(auth_header, limit=9)
            res = make_response(recommendations["tracks"], 200)
    else:
        res = make_response("token not in session", 401)
    return res


@app.route("/api/user/rose_chart")
def rose_chart():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        image, best, features_dict = analysis.visualize_features(spotify.get_audio_features(auth_header))
        new_best = spotify.new_dict_track_by_features(auth_header, best)

        return make_response(jsonify({
            "image": base64.b64encode(image).decode('utf-8'),
            "best": new_best,
            "features_dict": features_dict
        }), 200)
    else:
        return make_response("token not in session", 401)


@app.route('/api/search', methods=['POST'])
def search():
    if 'auth_header' in session:
        data = request.json
        name = data.get('name')
        auth_header = session['auth_header']
        data = spotify.search(auth_header, name, limit=15)
        items = data["track" + 's']['items']
        return make_response(items, 200)
    return make_response("token not in session", 401)


@app.route('/api/generated_tracks', methods=['POST'])
def get_generated_tracks():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        data = request.json
        tracks = data.get('tracks')
        generated_tracks = spotify.generate_playlist_tracks(auth_header, tracks, limit=20)

        return make_response(generated_tracks["tracks"], 200)
    return make_response("token not in session", 401)


@app.route('/api/create_playlist', methods=['POST'])
def create_playlist():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        data = request.json
        name = data.get('name')
        description = data.get('description')
        user_id = data.get('user_id')
        playlist_id, is_exists = spotify.create_playlist(auth_header, user_id, name, description)
        return make_response(jsonify({
            "is_exists": is_exists,
            "playlist_id": playlist_id
        }), 201)
    return make_response("token not in session", 401)


@app.route('/api/add_tracks', methods=['POST'])
def add_tracks():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        data = request.json
        tracks = data.get('tracks')
        playlist_id = data.get('playlist_id')
        spotify.add_tracks_to_playlist(auth_header, playlist_id, tracks)
        return make_response("tracks added", 201)
    return make_response("token not in session", 401)


@app.route('/api/set_playlist_image', methods=('POST', 'PUT'))
def set_playlist_image():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        data = request.json
        image = data.get('image')
        playlist_id = data.get('playlist_id')
        if (len(image) * 3) / 4 - image.count('=', -2) > 256000:
            buffer = io.BytesIO()
            imgdata = base64.b64decode(image)
            img = Image.open(io.BytesIO(imgdata))
            img.save(buffer, format="JPEG", optimize=True)
            image = base64.b64encode(buffer.getvalue())

        spotify.set_image(auth_header, playlist_id, image)
        return make_response("image is installed", 202)
    return make_response("token not in session", 401)


@app.route("/api/logout")
def logout():
    session.clear()
    url = 'https://www.spotify.com/logout'
    webbrowser.open(url, new=2)
    return make_response("successful logout", 200)


# ----------------------- some func -------------------------
def get_genres(auth_header):
    recently_played = spotify.get_recently_played(auth_header)
    if len(recently_played['items']) < 1: return make_response("not enough data", 204)
    top_artists_ids = analysis.get_history_top_artists(recently_played)
    top_artists = spotify.get_several_artists(auth_header, top_artists_ids)
    genres = spotify.get_user_genres(auth_header, top_artists)
    return genres


if __name__ == "__main__":
    app.run()

