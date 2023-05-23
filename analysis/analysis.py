import pandas as pd
import plotly
import plotly.express as px


def normalize_history(json_data):
    df = pd.json_normalize(json_data['items'])
    df['artist'] = df['track.artists'].apply(lambda artists: [artist['name'] for artist in artists])
    df = df.explode('artist')
    df = df[['played_at', 'artist', 'track.name', 'track.album.name']]
    df.columns = ['Played At', 'Artist', 'Track Name', 'Album Name']
    pd.set_option('display.max_columns', None)
    return df


def visualize_top_artists(json_data):
    streaming_history = normalize_history(json_data)
    artists_count = streaming_history.groupby(['Artist']).agg(Count=('Artist', 'count')).reset_index()
    artists_count.rename(columns={'Count': 'Tracks listened'}, inplace=True)
    artists_count = artists_count.sort_values(by=['Tracks listened'], ascending=False).head(15)

    color_continuous_scale = ['#2F0F43', '#522278', '#613D9C']

    fig = px.pie(artists_count, values='Tracks listened', names='Artist',
                 color_discrete_sequence=color_continuous_scale, hole=0.65)
    fig.update_traces(textfont=dict(size=25), hovertemplate=' <br>   %{label}   <br> ')

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

    fig.update_layout(
        {
            'plot_bgcolor': 'rgba(0,0,0,0)',
            'paper_bgcolor': 'rgba(0,0,0,0)'
        },
        shapes=[big_circle, small_circle], showlegend=False,
        hoverlabel=dict(bgcolor="black", font_size=20, font_family="Helvetica")
    )

    fig.show()
