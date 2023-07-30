import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/newtracksReducer";

const NewtracksContext = createContext();

const getLocalePlaylistData = (name) => {
    let newPlaylistData = localStorage.getItem(name);
    if(newPlaylistData === null){
      return []
    } else {
      return JSON.parse(newPlaylistData);
    }
  }

const initialState = {
    playlist: getLocalePlaylistData('playlist'),
    tracks:getLocalePlaylistData('tracks')
};

const NewtracksProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const generateItems = (playlist, tracks) => {
        dispatch({ type: "DENERATE_ITEM", payload:{ playlist, tracks} });
      };
    
    const removeTrack = (id) => {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    };
  
    const clearPlaylist = () => {
      dispatch({ type: "CLEAR_PLAYLIST" });
    };
  
    useEffect(() => {
      localStorage.setItem("tracks", JSON.stringify(state.tracks))
    }, [state.tracks])
  
    return (
      <NewtracksContext.Provider value={{ ...state, generateItems, removeTrack, clearPlaylist }}>
        {children}
      </NewtracksContext.Provider>
    );
  };
  
  const useNewtracksContext = () => {
    return useContext(NewtracksContext);
  };
  
  export { NewtracksProvider, useNewtracksContext };