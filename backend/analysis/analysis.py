import pandas as pd
import plotly.express as px
import plotly.io as pio

def visualize_top_artists(json_data, is_top=False):
    if is_top:
        streaming_history = __normalize_top(json_data)
    else:
        streaming_history = __normalize_history(json_data)

    artists_count = streaming_history.groupby(['Artist']).agg(Count=('Artist', 'count')).reset_index()
    artists_count.rename(columns={'Count': 'Tracks listened'}, inplace=True)
    artists_count.sort_values(by=['Tracks listened'], ascending=False, inplace=True)

    artists_count = __make_others_section(artists_count)
    return pio.to_json(__plot_pie_chart(artists_count), pretty=True)


def visualize_genres_barchart(genres_complex_list):
    genres = convert_genres(genres_complex_list)

    color_continuous_scale = ['#011476', '#191274', '#251172', '#2e0f70', '#360d6e',
                              '#3c0b6c', '#420a69', '#470867', '#4c0765', '#500663']

    fig = px.bar(
        genres.head(8),
        x='Genre',
        y='% of total',
        color='% of total',
        color_continuous_scale=color_continuous_scale,
        text='Genre',
        labels={'% of total': 'Percent of total listened'},
        title='',
    )

    fig.update_traces(
        textangle=-90,
        textposition='inside',
        insidetextanchor='middle',
        marker_line_color='rgba(0, 0, 0, 0)'
    )

    fig.update_layout(
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        coloraxis=dict(showscale=False, colorscale=color_continuous_scale),
        showlegend=False,
        xaxis=dict(visible=False, showticklabels=False),
        yaxis=dict(showgrid=False, tickfont=dict(color='white', size=16)),
        font=dict(color='white', size=20),
    )

    return pio.to_json(fig, pretty=True)


def generate_genres_text(genres_complex_list):
    genres = convert_genres(genres_complex_list)
    best_genre = genres.iloc[[0]].values.flatten().tolist()
    return f'Here, overview of your listening habits is presented, providing insights into your musical preferences and patterns. Your listening habits reveal a unique blend of genres, artists, and styles that make up the soundtrack to your life. \nYou really love listening to {best_genre[0]}! You`ve listened to it {best_genre[1]} times lately.'


def unpack(genres_complex_list):
    genres_uncounted = []
    for genre in genres_complex_list:
        genres_uncounted.extend(genre)

    return genres_uncounted


def get_artist_ids(list_of_playlists):
    ids = []

    for playlist in list_of_playlists:
        df = pd.json_normalize(playlist['items'])
        df['artist_id'] = df['track.artists'].apply(lambda artists: [artist['id'] for artist in artists])
        df = df.explode('artist_id')
        ids.extend(df['artist_id'].values.tolist())

    return df['artist_id'].values.tolist()


def get_recommendations_from_region(liked_genres_json, playlists_content):
    pass


def __normalize_history(json_data):
    df = pd.json_normalize(json_data['items'])
    df['artist'] = df['track.artists'].apply(lambda artists: [artist['name'] for artist in artists])
    df = df.explode('artist')
    df = df[['played_at', 'artist', 'track.name', 'track.album.name']]
    df.columns = ['Played At', 'Artist', 'Track Name', 'Album Name']
    pd.set_option('display.max_columns', None)
    return df


def __normalize_top(json_data):
    df = pd.json_normalize(json_data['items'])
    df['artist'] = df['artists'].apply(lambda artists: [artist['name'] for artist in artists])
    df = df.explode('artist')
    df = df[['artist', 'name', 'album.name']]
    df.columns = ['Artist', 'Track Name', 'Album Name']
    pd.set_option('display.max_columns', None)
    return df


def __make_others_section(artists_count):
    last_rows = artists_count.head(12).tail(3)
    column_sum = last_rows['Tracks listened'].sum()
    tracks_sum = artists_count['Tracks listened'].head(12).sum()

    if column_sum / tracks_sum <= 0.12:
        artists_count = artists_count.head(12)
        artists_count.drop(artists_count.iloc[:-3], inplace=True, axis=1)
        new_row = pd.DataFrame({'Artist': 'Others', 'Tracks listened': column_sum}, index=[len(artists_count)])
        artists_count = pd.concat([artists_count, new_row])
        return artists_count
    else:
        return artists_count.head(10)


def __plot_pie_chart(artists_count):
    color_continuous_scale = ['#2f0f43', '#39194f', '#43235c', '#4d2d68', '#573776',
                              '#614283', '#6c4c91', '#76579e', '#8063ad', '#8b6ebb']

    fig = px.pie(artists_count, values='Tracks listened', names='Artist',
                 color_discrete_sequence=color_continuous_scale, hole=0.65)
    fig.update_traces(textfont=dict(size=25), hovertemplate=' <br>   %{label}   <br> ')

    big_circle, small_circle = __draw_circles()

    fig.update_layout(
        {
            'plot_bgcolor': 'rgba(0,0,0,0)',
            'paper_bgcolor': 'rgba(0,0,0,0)'
        },
        shapes=[big_circle, small_circle], showlegend=False,
        hoverlabel=dict(bgcolor="black", font_size=20, font_family="Helvetica")
    )

    return fig


def __draw_circles():
    big_circle = dict(
        type='circle',
        xref='paper', yref='paper',
        x0=0.23, y0=-0.07, x1=0.77, y1=1.07,
        line_color='black', line_width=5
    )

    small_circle = dict(
        type='circle',
        xref='paper', yref='paper',
        x0=0.37, y0=0.22, x1=0.63, y1=0.78,
        line_color='grey', line_width=5
    )

    return big_circle, small_circle


def convert_genres(genres_complex_list):
    genres_uncounted = unpack(genres_complex_list)
    genres_dict = {item: genres_uncounted.count(item) for item in genres_uncounted}
    genres = pd.DataFrame.from_dict(genres_dict, orient='index')
    genres.reset_index(inplace=True)
    genres.columns = ['Genre', 'Count']

    genres['% of total'] = round(genres['Count'] / genres['Count'].sum() * 100)

    genres.sort_values(by='Count', inplace=True, ascending=False)

    return genres
