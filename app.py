from flask import Flask, request, redirect, g, render_template, session, url_for
from spotify_requests import spotify

app = Flask(__name__)
app.secret_key = 'some secret key ;)'


# ----------------------- AUTH -------------------------

@app.route("/auth")
def auth():
    return redirect(spotify.AUTH_URL)


@app.route("/callback/")
def callback():
    auth_token = request.args['code']
    auth_header = spotify.authorize(auth_token)
    session['auth_header'] = auth_header

    #return profile()
    return redirect(url_for('profile'))


def valid_token(resp):
    return resp is not None and not 'error' in resp


# -------------------------- API REQUESTS ----------------------------


@app.route("/")
def index():
    return render_template('index.html')



@app.route('/profile')
def profile():
    if 'auth_header' in session:
        auth_header = session['auth_header']
        # get profile data
        profile_data = spotify.get_users_profile(auth_header)

        # get user playlist data
        playlist_data = spotify.get_users_playlists(auth_header)

        # get user recently played tracks
        recently_played = spotify.get_users_recently_played(auth_header)
        top = spotify.get_users_top(auth_header, 'tracks') #tracks/artists
        library = spotify.get_users_saved_tracks(auth_header)
        audio_features = spotify.get_users_audio_features(auth_header)
        recommendations = spotify.get_recommendations(auth_header, limit=9, t_count=2, a_count=1, g_count=2) #market (tracks+artists+genres<=5)
        if valid_token(recently_played):
            return render_template("index.html",
                                   user=profile_data,
                                   playlists=playlist_data["items"],
                                   recently_played=recently_played["items"],
                                   top=top["items"],
                                   library=library["items"],
                                   audio_features=audio_features['audio_features'],
                                   recommendations=recommendations["tracks"])

    return render_template('index.html')

@app.route('/search')
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

        return render_template('search.html',
                               name=name,
                               results=items,
                               api_url=api_url,
                               search_type="track")
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True, port=spotify.PORT)
