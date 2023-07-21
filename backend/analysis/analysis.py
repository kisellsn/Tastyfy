import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
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


def get_history_top_artists(json_data):
    streaming_history = __normalize_history(json_data)
    artist_counts = streaming_history['artist_id'].value_counts()
    top_artist_ids = artist_counts.head(6).index.tolist()
    return top_artist_ids


def visualize_genres_barchart(genres_complex_list):
    genres = convert_genres(genres_complex_list)

    color_continuous_scale = ['#500663', '#4c0765', '#470867', '#420a69', '#3c0b6c',
                              '#360d6e', '#2e0f70', '#251172', '#191274', '#011476']

    fig = px.bar(
        genres.head(10),
        x='% of total',
        y='Genre',
        orientation='h',
        color='Genre',
        color_discrete_sequence=color_continuous_scale,
        text='Genre',
        labels={'% of total': 'Percent of total listened'},
        title='',
        hover_name='Genre',
        hover_data={
            'Genre': False,
            '% of total': False,
            'Count': True
        }
    )

    fig.update_traces(
        textposition='inside',
        insidetextanchor='middle',
        marker_line_color='rgba(0, 0, 0, 0)',
        hovertemplate=' <br> <b>%{hovertext} </b> <br> Times listened: %{customdata[0]} <br> <extra></extra>'
    )

    fig.update_layout(
        plot_bgcolor='rgba(0, 0, 0, 0)',
        paper_bgcolor='rgba(0, 0, 0, 0)',
        coloraxis=dict(showscale=False, colorscale=color_continuous_scale),
        showlegend=False,
        xaxis=dict(tickfont=dict(color='white'), side='top', title_standoff=15, gridcolor='#845091', fixedrange=True),
        yaxis=dict(visible=False, showticklabels=False, fixedrange=True),
        font=dict(color='white'),
        margin=dict(t=0, b=0, r=0, l=0),
        hoverlabel=dict(font_size=20, font_family='Helvetica'),
    )

    return pio.to_json(fig, pretty=True)


def visualize_features(features_dict):
    features = pd.DataFrame.from_dict(features_dict)
    feature_names, feature_means, best_examples = collect_means(features)
    feature_names.append(feature_names[0])
    feature_means.append(feature_means[0])

    fig = go.Figure()

    fig.add_trace(
        go.Scatterpolar(
            r=feature_means,
            theta=feature_names,
            mode='lines+markers',
            fill='toself',
            fillcolor='rgba(114, 5, 31, 0.68)',
            line=dict(color='#72051F', width=3),
            marker=dict(color='white', size=13, opacity=0.5)
        )
    )

    fig.update_layout(
        plot_bgcolor='rgba(0, 0, 0, 0)',
        paper_bgcolor='rgba(0, 0, 0, 0)',
        showlegend=False,
        polar=dict(
            radialaxis=dict(range=[0, 10], gridcolor='white', gridwidth=3, showticklabels=False,
                            nticks=7, tickfont=dict(family='Helvetica', size=20)),
            angularaxis=dict(gridcolor='white', gridwidth=2, rotation=38, tickfont=dict(family='Helvetica', size=25)),
            bgcolor='#160620',
            gridshape='linear'
        ),
        font=dict(color='white')
    )

    # image = pio.to_image(fig, format=None, width=None, height=None, scale=None, validate=True, engine='auto')
    return pio.to_json(fig, pretty=True), best_examples


def collect_means(features):
    features.rename(columns={'valence': 'happiness'}, inplace=True)
    names = ['id', 'acousticness', 'energy', 'liveness',
             'danceability', 'happiness', 'instrumentalness', 'loudness']

    features = features[names]
    features['loudness'] = (features['loudness'] + 60)/60
    features[features.select_dtypes(include=['number']).columns] *= 10

    means = get_means(names, features)
    best_examples = get_best_examples(names, features)

    return names[1:], means, best_examples


def get_means(names, features):
    means = []
    for i in range(1, len(names)):
        means.append(features[names[i]].mean())

    means = [round(elem, 1) for elem in means]

    return means


def get_best_examples(names, features):
    best_examples = {}
    for i in range(1, len(names)):
        best_examples[names[i].capitalize()] = features.loc[features[names[i]].idxmax()]['id']
        names[i] = names[i].capitalize()

    return best_examples


def generate_genres_text(genres_complex_list):
    genres = convert_genres(genres_complex_list)
    best_genre = genres.iloc[[0]].values.flatten().tolist()
    return f'Here is the overview of your listening habits, providing insights into your musical preferences and ' \
           f'patterns. Your listening habits reveal a unique blend of genres, artists, and styles that make up the ' \
           f'soundtrack to your life. \nYou really love listening to {best_genre[0]}! You`ve listened to it ' \
           f'{best_genre[1]} times lately.'


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


def __normalize_history(json_data):
    df = pd.json_normalize(json_data['items'])
    df['artist'] = df['track.artists'].apply(lambda artists: [artist['name'] for artist in artists])
    df['artist_id'] = df['track.artists'].apply(lambda artists: [artist['id'] for artist in artists])
    df = df.explode('artist')
    df = df[['played_at', 'artist_id', 'artist', 'track.name', 'track.album.name']]
    df.columns = ['Played At', 'artist_id', 'Artist', 'Track Name', 'Album Name']
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

    if column_sum / tracks_sum <= 0.15 and artists_count[artists_count.columns[0]].count() > 9:
        if artists_count['Tracks listened'].max()/tracks_sum < 0.3:
            artists_count = artists_count.head(9)
        else:
            artists_count = artists_count.head(6)

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
    fig.update_traces(textfont=dict(size=25), hovertemplate=' <br>   %{label}   <br> ',
                      texttemplate='%{percent:.1%}', sort=False)

    big_circle, small_circle = __draw_circles()

    fig.update_layout(
        {
            'plot_bgcolor': 'rgba(0,0,0,0)',
            'paper_bgcolor': 'rgba(0,0,0,0)'
        },
        shapes=[big_circle, small_circle], showlegend=False,
        hoverlabel=dict(bgcolor='black', font_size=20, font_family='Helvetica'),
    )

    fig.update_yaxes(
        scaleanchor='x',
        scaleratio=1,
    )

    return fig


def __draw_circles():
    big_circle = dict(
        type='circle',
        xref='paper', yref='paper',
        # x0=0.23, y0=-0.07, x1=0.77, y1=1.07,
        x0=-0.07, y0=-0.05, x1=1.07, y1=1.05,
        line_color='black', line_width=5
    )

    small_circle = dict(
        type='circle',
        xref='paper', yref='paper',
        # x0=0.37, y0=0.22, x1=0.63, y1=0.78,
        x0=0.25, y0=0.25, x1=0.75, y1=0.75,
        line_color='grey', line_width=5
    )

    return big_circle, small_circle


def convert_genres(genres_complex_list):
    genres_uncounted = unpack(genres_complex_list)

    genres_dict = {item: genres_uncounted.count(item) for item in genres_uncounted}
    genres = pd.DataFrame.from_dict(genres_dict, orient='index')
    genres.reset_index(inplace=True)
    genres.columns = ['Genre', 'Count']

    genres['% of total'] = round(genres['Count'] / genres['Count'].sum() * 100, 1)

    genres.sort_values(by='Count', inplace=True, ascending=False)

    return genres
