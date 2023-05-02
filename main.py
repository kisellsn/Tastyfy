from spotifyAPI import *
import requests
import os
import base64
import spotipy
from dotenv import load_dotenv
from requests import post, get
import json
import random
import string
import hashlib
from urllib.parse import urlencode, urlparse
import webbrowser

import asyncio
from flask import Flask, redirect, request, url_for
load_dotenv()
app = Flask(__name__)

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")


def generate_random_string(length):
    letters_and_digits = string.ascii_letters + string.digits
    result_str = ''.join(random.choice(letters_and_digits) for i in range(length))
    return result_str

async def generateCodeChallenge(codeVerifier):
    def base64encode(string):
        encoded = base64.urlsafe_b64encode(string).rstrip(b'=')
        return encoded.decode('utf-8')

    encoder = hashlib.sha256()
    data = codeVerifier.encode('utf-8')
    encoder.update(data)
    digest = encoder.digest()

    return base64encode(digest)
def get_token():
    auth_string = client_id+":"+client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result["access_token"]
    return token


def get_auth_header(token):
    return {"Authorization": "Bearer " + token}


@app.route('/')
def login():


    codeVerifier = generate_random_string(128)
    codeChallenge = asyncio.run(generateCodeChallenge(codeVerifier))
    state = generate_random_string(16)
    scope = 'user-read-private user-read-email'

    args = {
        'response_type': 'code',
        'client_id': client_id,
        'scope': scope,
        'redirect_uri': redirect_uri,
        'state': state,
        'code_challenge_method': 'S256',
        'code_challenge': codeChallenge
    }

    webbrowser.open('https://accounts.spotify.com/authorize?' + urlencode(args))
    return "0"


if __name__ == '__main__':
    token = get_token()
    app.run(port=8000, debug=True)
