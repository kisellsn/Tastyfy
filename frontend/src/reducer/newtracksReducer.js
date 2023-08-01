const playlistReducer = (state, action) => {
    if (action.type === "DENERATE_ITEM") {

        let { playlist, tracks } = action.payload;
        let newTracks;
        function arePlaylistsEqual(playlist1, playlist2) {
            if(!playlist1.length || !playlist2.length) return false;
            if (playlist1.length !== playlist2.length) {
              return false;
            }

            for (let i = 0; i < playlist1.length; i++) {
              if (playlist1[i].id !== playlist2[i].id) {
                return false;
              }
            }
          
            return true;
        }
        const areEqual = arePlaylistsEqual(state.playlist2, playlist);
        if (areEqual && tracks.length > 0){
            return{
                ...state,
            }
        } else {
            newTracks = tracks?.map(track => ({
                id: track.id,
                song: track,
              }));
            return{
                ...state,
                playlist2: playlist,
                tracks: newTracks,
            }
        }
    }

    if (action.type === "REMOVE_ITEM") {
        let updatedPlaylist = state.tracks.filter(
          (curItem) => curItem.id !== action.payload
        );
        return {
          ...state,
          tracks: updatedPlaylist,
        };
      }

    if (action.type === "CLEAR_PLAYLIST") {
        return {
          ...state,
          tracks: [],
          playlist2: [],
        };
    }
}  
export default playlistReducer;