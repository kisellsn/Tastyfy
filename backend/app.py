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
    auth_token = request.args['code']
    auth_header,refresh_header = spotify.authorize(auth_token)
    session['auth_header'] = auth_header
    session['refresh_token']=refresh_header
    #return jsonify({
    #    "profile": url_for('profile')
    #})
    return redirect("http://localhost:3000/menu")


def valid_token(resp):
    return resp is not None and not 'error' in resp

@app.route("/token")
def get_code():
    if 'auth_header' in session:
        return make_response(jsonify(session['auth_header']), 200)
    return make_response('token not found',404)

# -------------------------- API REQUESTS ----------------------------


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/api/user')
def get_profile():
    if 'auth_header' in session:
        auth_header = session['auth_header']

        profile_data = spotify.get_users_profile(auth_header)
        res = make_response(profile_data, 200)
        res.set_cookie('auth_header', auth_header)

        return res


@app.route('/api/user/diagram')
def diagram():
    if 'auth_header' in session:
        auth_header = session['auth_header']
#????????????????????????????????????????????
        term = request.args['term']
        if term in ['medium_term', 'short_term', 'long_term']:
            top = spotify.get_users_top(auth_header, 'tracks')  # tracks/artists
            fig = analysis.visualize_top_artists(top)
        elif term == 'current':
            recently_played = spotify.get_users_recently_played(auth_header, 50)
            fig = analysis.visualize_top_artists(recently_played)
        return fig

@app.route('/api/user/top_or_recently')
def user_tracks():
    if 'auth_header' in session:
        auth_header = session['auth_header']
#????????????????????????????????????????????
        term = request.args['term']
        if term in ['medium_term', 'short_term', 'long_term']:
            top = spotify.get_users_top(auth_header, 'tracks')  # tracks/artists
            return jsonify({"top": top["items"]})
        elif term == 'current':
            recently_played = spotify.get_users_recently_played(auth_header, 10)
            return jsonify({"recently_played": recently_played["items"]})

@app.route('/api/user/recommendations')
def recommendations():
    if 'auth_header' in session:
        auth_header = session['auth_header']

        recommendations = spotify.get_recommendations(auth_header, limit=2, t_count=2, a_count=1, g_count=2,
                                                      market="UA")  # market (tracks+artists+genres<=5)
        return jsonify({"recommendations": recommendations["tracks"]})


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

@app.route("/logout")
def logout():
    session.clear()
    return 'True'


if __name__ == "__main__":
    app.run(debug=True, port=spotify.PORT)
