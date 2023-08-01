from __future__ import print_function
import json
import requests
import sys
import base64
import string
import random
from collections import Counter
from datetime import datetime, timedelta

try:
    import urllib.request, urllib.error
    import urllib.parse as urllibparse
except ImportError:
    import urllib as urllibparse


def generate_random_string(length):
    letters_and_digits = string.ascii_letters + string.digits
    result_str = ''.join(random.choice(letters_and_digits) for i in range(length))
    return result_str


# ----------------- SPOTIFY BASE URL ----------------

SPOTIFY_API_BASE_URL = 'https://api.spotify.com'
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

# ----------------- USER AUTHORIZATION ----------------

# spotify endpoints
SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com/{}"
SPOTIFY_AUTH_URL = SPOTIFY_AUTH_BASE_URL.format('authorize')
SPOTIFY_TOKEN_URL = SPOTIFY_AUTH_BASE_URL.format('api/token')

# client keys
CLIENT = json.load(open('conf.json', 'r+'))
CLIENT_ID = CLIENT['id']
CLIENT_SECRET = CLIENT['secret']

# server side parameter
CLIENT_SIDE_URL = "http://localhost"
CLIENT_PORT = 3000
SERVER_PORT = 8000
REDIRECT_URI = "{}:{}/callback/".format(CLIENT_SIDE_URL, CLIENT_PORT)
SCOPE = "user-read-private user-read-email ugc-image-upload user-library-read " \
        "playlist-modify-public playlist-modify-private user-read-recently-played " \
        "user-top-read user-library-modify"
STATE = generate_random_string(16)

auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    "state": STATE,
    "client_id": CLIENT_ID,
    # "show_dialog": "True"
}

# python 3
if sys.version_info[0] >= 3:
    URL_ARGS = "&".join(["{}={}".format(key, urllibparse.quote(val))
                         for key, val in list(auth_query_parameters.items())])
else:
    URL_ARGS = "&".join(["{}={}".format(key, urllibparse.quote(val))
                         for key, val in auth_query_parameters.iteritems()])

AUTH_URL = "{}/?{}".format(SPOTIFY_AUTH_URL, URL_ARGS)


def authorize(auth_token):
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI
    }

    # python 3 or above
    if sys.version_info[0] >= 3:
        base64encoded = base64.b64encode(("{}:{}".format(CLIENT_ID, CLIENT_SECRET)).encode())
        headers = {"Authorization": "Basic {}".format(base64encoded.decode())}
    else:
        base64encoded = base64.b64encode("{}:{}".format(CLIENT_ID, CLIENT_SECRET))
        headers = {"Authorization": "Basic {}".format(base64encoded)}

    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload,
                                 headers=headers)

    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]
    refresh_token = response_data["refresh_token"]
    expires_in = response_data["expires_in"]

    auth_header = {"Authorization": "Bearer {}".format(access_token)}
    return auth_header, refresh_token, datetime.today() + timedelta(seconds=expires_in)

def get_refresh_token(refresh_token):
    body = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token
    }
    # python 3 or above
    if sys.version_info[0] >= 3:
        base64encoded = base64.b64encode(("{}:{}".format(CLIENT_ID, CLIENT_SECRET)).encode())
        headers = {"Authorization": "Basic {}".format(base64encoded.decode())}
    else:
        base64encoded = base64.b64encode("{}:{}".format(CLIENT_ID, CLIENT_SECRET))
        headers = {"Authorization": "Basic {}".format(base64encoded)}

    post_refresh = requests.post(SPOTIFY_TOKEN_URL, data=body, headers=headers)
    response_data = json.loads(post_refresh.text)
    access_token = response_data["access_token"]
    expires_in = response_data["expires_in"]

    auth_header = {"Authorization": "Bearer {}".format(access_token)}
    return auth_header, refresh_token, datetime.today() + timedelta(seconds=expires_in)


# spotify endpoints
USER_PROFILE_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'me')
USER_LIBRARY_ENDPOINT = "{}/{}".format(USER_PROFILE_ENDPOINT, 'tracks')

# ------------------ USERS by id ---------------------------
GET_USER_ENDPOINT = '{}/{}'.format(SPOTIFY_API_URL, 'users')


def get_profile_by_id(user_id):
    url = "{}/{id}".format(GET_USER_ENDPOINT, id=user_id)
    resp = requests.get(url)
    return resp.json()


# ------------------ USER RELATED REQUETS  ---------- #


def get_current_profile(auth_header):
    url = USER_PROFILE_ENDPOINT
    resp = requests.get(url, headers=auth_header)
    return resp.json()


USER_PLAYLISTS_ENDPOINT = "{}/{}".format(USER_PROFILE_ENDPOINT, 'playlists')


def get_user_playlists(auth_header):
    url = USER_PLAYLISTS_ENDPOINT
    resp = requests.get(url, headers=auth_header)
    return resp.json()


USER_TOP_ARTISTS_AND_TRACKS_ENDPOINT = "{}/{}".format(USER_PROFILE_ENDPOINT, 'top')  # /<type>


def get_top_items(auth_header, t, term='medium_term'):
    if t not in ('artists', 'tracks'):
        print('invalid type')
        return None
    if term not in ('medium_term', 'short_term', 'long_term'):
        print('invalid type')
        return None
    url = "{}/{type}?time_range={time_range}&limit={limit}".format(USER_TOP_ARTISTS_AND_TRACKS_ENDPOINT,
                                                                   type=t, time_range=term, limit=str(50))
    resp = requests.get(url, headers=auth_header)
    return resp.json()


def get_saved_tracks(auth_header, limit):
    offset = 0
    url = "{}?limit={limit}&offset={offset}".format(USER_LIBRARY_ENDPOINT, limit=str(50), offset=str(offset))
    resp = requests.get(url, headers=auth_header).json()['items']
    while offset != limit - 50:
        offset += 50
        url = "{}?limit={limit}&offset={offset}".format(USER_LIBRARY_ENDPOINT, limit=str(50), offset=str(offset))
        resp2 = requests.get(url, headers=auth_header).json()['items']
        if not resp2: break
        resp.extend(resp2)
    return resp


AUDIO_FEATURES_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'audio-features')


def get_audio_features(auth_header):
    saved_tracks = get_saved_tracks(auth_header, 200)
    if len(saved_tracks) < 2: return "not enough tracks"
    # track_ids = ','.join(map(lambda track: track['track']['id'], saved_tracks['items']))
    track_ids = [track['track']['id'] for track in saved_tracks]
    params = "ids=" + ','.join(track_ids[:100])
    url = "{}?{}".format(AUDIO_FEATURES_ENDPOINT, params)
    resp = requests.get(url, headers=auth_header).json()['audio_features']
    while len(track_ids) > 100:
        track_ids = track_ids[100:]
        params = "ids=" + ','.join(track_ids[:100])
        url = "{}?{}".format(AUDIO_FEATURES_ENDPOINT, params)
        resp2 = requests.get(url, headers=auth_header).json()['audio_features']
        if not resp2: break
        resp.extend(resp2)
    return resp


def new_dict_track_by_features(auth_header, dict):
    ids_list = list(dict.values())
    tracks = get_several_tracks(auth_header, ids_list)
    dict.update(zip(dict.keys(), tracks["tracks"]))
    return dict


USER_RECENTLY_PLAYED_ENDPOINT = "{}/{}/{}".format(USER_PROFILE_ENDPOINT, 'player', 'recently-played')


def get_recently_played(auth_header, limit=50):
    url = "{}?limit={limit}".format(USER_RECENTLY_PLAYED_ENDPOINT, limit=str(limit))
    resp = requests.get(url, headers=auth_header)
    return resp.json()


# -----------------SEARCH ------------------------

SEARCH_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'search')


def search(auth_header, name, search_type='track', limit=10, market=None):
    if search_type not in ('artist', 'track', 'album', 'playlist'):
        print('invalid input')
        return None
    if market:
        url = '{}?q={}&type={}&limit={}&market={}'.format(SEARCH_ENDPOINT, name, search_type, str(limit), market)
    else:
        url = '{}?q={}&type={}&limit={}'.format(SEARCH_ENDPOINT, name, search_type, str(limit))
    resp = requests.get(url, headers=auth_header)
    return resp.json()


# -----------------Featured Playlists-------------------------
BROWSE_FEATURED_PLAYLISTS = "{}/{}/{}".format(SPOTIFY_API_URL, 'browse',
                                              'featured-playlists')
PLAYLIST_ITEMS = "{}/{}".format(SPOTIFY_API_URL, 'playlists')


def get_featured_playlists(auth_header, limit=1, country=None, locale=None):
    params = []
    if country is not None:
        params.append("country={}".format(country))
    if locale is not None:
        params.append("locale={}".format(locale))
    params.append("limit={}".format(limit))

    url = BROWSE_FEATURED_PLAYLISTS + "?" + "&".join(params)

    resp = requests.get(url, headers=auth_header)
    resp = resp.json()["playlists"]
    rec = []
    tracks = get_playlists_tracks(auth_header, resp, 9)
    for track in tracks:
        rec.extend(item["track"] for item in track["items"])
    return rec


def get_playlists_tracks(auth_header, playlists, limit=50):  ######
    items = []
    for pl in playlists["items"]:
        items.append(get_playlist_items(auth_header, pl["id"], limit))
    return items


def get_playlist_items(auth_header, playlist_id, limit=50):
    url = "{}/{playlist_id}/tracks?limit={limit}".format(PLAYLIST_ITEMS, playlist_id=playlist_id, limit=str(limit))
    resp = requests.get(url, headers=auth_header)
    return resp.json()


def get_user_genres(auth_header, top_artists):
    if len(top_artists['artists']) < 1: return []
    genres = []
    for artist in top_artists['artists']:
        if artist['genres']: genres.append(artist['genres'])
    return genres


# ---------------------RECOMMENDATIONS--------------------
RECOMMENDATIONS_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'recommendations')


def get_recommendations(auth_header, limit):
    artists_ids = ''
    t_count = 3
    top_artists = get_top_items(auth_header, 'artists')
    if len(top_artists['items']) < 2:
        t_count = 5
    else:
        artists_ids = ','.join(artist['id'] for artist in top_artists['items'][:2])

    top_tracks = get_top_items(auth_header, 'tracks')
    if len(top_tracks['items']) < 3:
        playlist_tracks = get_featured_playlists(auth_header, limit=1)[:t_count]
        tracks_ids = ','.join([track['id'] for track in playlist_tracks])
    else:
        tracks_ids = ','.join([track['id'] for track in top_tracks['items'][:t_count]])

    url = '{}?limit={}&seed_artists={}&seed_genres=&seed_tracks={}'.format(RECOMMENDATIONS_ENDPOINT, str(limit),
                                                                             artists_ids, tracks_ids)
    resp = requests.get(url, headers=auth_header)
    return resp.json()


# ---------------Save Tracks for Current User---------------

def save_track(auth_header, tracks):
    ids = ','.join([track['id'] for track in tracks['tracks']])
    url = "{}?{}".format(USER_LIBRARY_ENDPOINT, "ids=" + ids)
    auth_header["Content-Type"] = "application/json"
    resp = requests.put(url, headers=auth_header)
    return resp


# -----------------Generate Playlist-------------------------


def generate_playlist_tracks(auth_header, tracks, limit=20):
    tracks_ids = ','.join([track['id'] for track in tracks[0:5]])
    seed_tracks = tracks_ids

    url = '{}?seed_genres=&seed_artists=&seed_tracks={}&limit={}'.format(RECOMMENDATIONS_ENDPOINT,
                                                                          seed_tracks, limit)

    resp = requests.get(url, headers=auth_header)
    return resp.json()


def create_playlist(auth_header, user_id, name, description=""):
    is_exists=False
    user_playlists = get_user_playlists(auth_header)["items"]
    if all(play["name"] != name for play in user_playlists):
        url = "{}/{id}/{playlists}".format(GET_USER_ENDPOINT, id=user_id, playlists="playlists")
        data = json.dumps({
            "name": name,
            "description": description
        })
        auth_header["Content-Type"] = "application/json"
        resp = requests.post(url, data=data, headers=auth_header)
    else:
        matching_playlist = next((play for play in user_playlists if play["name"] == name), None)
        is_exists = True
        return matching_playlist["id"], is_exists
    return resp.json()["id"], is_exists


def set_image(auth_header, playlist_id, image):
    url = "{}/playlists/{id}/images".format(SPOTIFY_API_URL, id=playlist_id)
    auth_header["Content-Type"] = "image/jpeg"
    resp = requests.put(url, data=image, headers=auth_header, verify=False)
    return resp


def add_tracks_to_playlist(auth_header, playlist_id, tracks):
    uris = ','.join([track['uri'] for track in tracks])
    url = "{}/playlists/{id}/tracks?uris={uris}".format(SPOTIFY_API_URL, id=playlist_id, uris=uris)

    data = json.dumps({
        "position": 0
    })
    auth_header["Content-Type"] = "application/json"
    resp = requests.post(url, data=data, headers=auth_header)
    return resp


# ---------------- ARTISTS ------------------------

GET_ARTIST_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'artists')


def get_artist_by_id(auth_header, artist_id):
    url = "{}/{id}".format(GET_ARTIST_ENDPOINT, id=artist_id)
    resp = requests.get(url, headers=auth_header)
    return resp.json()


def get_several_artists(auth_header, list_of_ids):
    url = "{}/?ids={ids}".format(GET_ARTIST_ENDPOINT, ids=','.join(list_of_ids))
    resp = requests.get(url, headers=auth_header)
    return resp.json()


def get_artists_albums(artist_id):
    url = "{}/{id}/albums".format(GET_ARTIST_ENDPOINT, id=artist_id)
    resp = requests.get(url)
    return resp.json()


def get_artists_top_tracks(artist_id, country='US'):
    url = "{}/{id}/top-tracks".format(GET_ARTIST_ENDPOINT, id=artist_id)
    myparams = {'country': country}
    resp = requests.get(url, params=myparams)
    return resp.json()


def get_related_artists(artist_id):
    url = "{}/{id}/related-artists".format(GET_ARTIST_ENDPOINT, id=artist_id)
    resp = requests.get(url)
    return resp.json()


# ---------------- ALBUMS ------------------------
GET_ALBUM_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'albums')


def get_album(album_id):
    url = "{}/{id}".format(GET_ALBUM_ENDPOINT, id=album_id)
    resp = requests.get(url)
    return resp.json()


def get_several_albums(list_of_ids):
    url = "{}/?ids={ids}".format(GET_ALBUM_ENDPOINT, ids=','.join(list_of_ids))
    resp = requests.get(url)
    return resp.json()


def get_albums_tracks(album_id):
    url = "{}/{id}/tracks".format(GET_ALBUM_ENDPOINT, id=album_id)
    resp = requests.get(url)
    return resp.json()


# ---------------- TRACKS ------------------------

GET_TRACK_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'tracks')


def get_track_by_id(auth_header, track_id):
    url = "{}/{id}".format(GET_TRACK_ENDPOINT, id=track_id)
    resp = requests.get(url, headers=auth_header)
    return resp.json()


def get_several_tracks(auth_header, list_of_ids):
    url = "{}/?ids={ids}".format(GET_TRACK_ENDPOINT, ids=','.join(list_of_ids))
    resp = requests.get(url, headers=auth_header)
    return resp.json()


music_genres = (
    "jazz",
    "hip hop",
    "blues",
    "rock",
    "country",
    "classical",
    "folk",
    "r&b",
    "soul",
    "reggae",
    "alternative",
    "punk rock",
    "electronic",
    "funk",
    "indie rock",
    "pop",
    "techno",
    "new-age",
    "edm",
    "dance-pop",
    "electro",
    "hollywood",
    "gospel",
    "metal",
    "ska",
    "grunge",
    "rap",
    "indie",
    "permanent wave")
