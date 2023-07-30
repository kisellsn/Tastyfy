const playlistReducer = (state, action) => {
    if (action.type === "ADD_TO_PLAYLIST") {
        let { id, song } = action.payload;
        let playlistSong;
        let existingPlaylistItemIndex;
        if (state.playlist === null) existingPlaylistItemIndex = -1
        else existingPlaylistItemIndex = state.playlist.findIndex(item => item.id === id);
        if (existingPlaylistItemIndex !== -1 || state.playlist.length >= 5) {
            const updatedPlaylist = [...state.playlist];
            return {
                ...state,
                playlist: updatedPlaylist,
            };
        } else {
            playlistSong = {
                id: id,
                song: song,
            };
            return {
                ...state,
                playlist: [...state.playlist, playlistSong],
            };
        }
    }

    if (action.type === "REMOVE_ITEM") {
        let updatedPlaylist = state.playlist.filter(
          (curItem) => curItem.id !== action.payload
        );
        return {
          ...state,
          playlist: updatedPlaylist,
        };
      }

    if (action.type === "CLEAR_PLAYLIST") {
        return {
          ...state,
          playlist: [],
        };
    }
}  
export default playlistReducer;