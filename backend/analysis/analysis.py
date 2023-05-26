import pandas as pd
import plotly.express as px


def visualize_top_artists(json_data, is_top=False):
    if is_top:
        streaming_history = __normalize_top(json_data)
    else:
        streaming_history = __normalize_history(json_data)

    artists_count = streaming_history.groupby(['Artist']).agg(Count=('Artist', 'count')).reset_index()
    artists_count.rename(columns={'Count': 'Tracks listened'}, inplace=True)

    artists_count = __make_others_section(artists_count)

    __plot_pie_chart(artists_count)


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
    df['artist'] = df['track.artists'].apply(lambda artists: [artist['name'] for artist in artists])
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
        artists_count.drop(artists_count.tail(3).index, inplace=True)
        new_row = pd.DataFrame({'Artist': 'Others', 'Tracks listened': column_sum}, index=[len(artists_count)])
        artists_count = pd.concat([artists_count, new_row])
        return artists_count.sort_values(by=['Tracks listened'], ascending=False)
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

    fig.show()


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
