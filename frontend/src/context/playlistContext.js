import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/playlistReducer";

const PlaylistContext = createContext();

const getLocalePlaylistData = () => {
    let newPlaylistData = localStorage.getItem("playlist");
    if(newPlaylistData === null){
      return []
    } else {
      return JSON.parse(newPlaylistData);
    }
  }

const initialState = {
    playlist: getLocalePlaylistData(),
};

const PlaylistProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const addToPlaylist = (id, song) => {
      dispatch({ type: "ADD_TO_PLAYLIST", payload: { id, song } });
    };
  
    const removeItem = (id) => {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    };
  
    const clearPlaylist = () => {
      dispatch({ type: "CLEAR_PLAYLIST" });
    };
  
    useEffect(() => {
      localStorage.setItem("playlist", JSON.stringify(state.playlist))
    }, [state.playlist])
  
    return (
      <PlaylistContext.Provider value={{ ...state, addToPlaylist, removeItem, clearPlaylist }}>
        {children}
      </PlaylistContext.Provider>
    );
  };
  
  const usePlaylistContext = () => {
    return useContext(PlaylistContext);
  };
  
  export { PlaylistProvider, usePlaylistContext };