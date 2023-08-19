import axios from 'axios';
import { clearLocalStorage } from './local';

const axiosInstance = axios.create({
    baseURL: '/api',
  });
  
  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            const token = await getToken();
            if (token !== 'new token was created') {
                clearLocalStorage();
                window.location.href = "/";
            }
        }
        if (error.response && error.response.status === 500) {
            clearLocalStorage();
            window.location.href = "/";
        }
      return Promise.reject(error);
    }
  );



export const registerSpotify = async () => {
    try {
        const response = await axiosInstance.get('/user');
        return response;
    } catch (error) {
        console.error('Error',error);
    }
    };
    
export const getToken = async () => {
    try {
        const response = await axios.get('/api/token');
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
};

export const getRecommendations = async() => {
    try {
        const response = await axiosInstance.get('/user/recommendations');
        return response;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

export const postRecommendations = async(code) => {
    try {
        const response = await axiosInstance.post('/user/recommendations', { code: code });
        return response;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}


export const topDiagram = async() => {
    try {
        const response = await axiosInstance.get('/user/top_genres');
        return response;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}


export const getText = async() => {
    try {
        const response = await axiosInstance.get('/user/genres_overview');
        return response;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}


export const getRecs = async() => {
    try {
        const response = await axiosInstance.get('/user/recommendations');
        return response;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}


export const sircleDiagram = async(term) => {
    try {
        if(term === 'start') term = 'current'
        const response = await axiosInstance.post('/user/diagram', {term});
        return response;
    } catch (error) {
        console.error('Error', error);
    }
}

export const getTops = async(term) => {
    try {
        if(term === 'start') term = 'current'
        const response = await axiosInstance.post('/user/top', {term});
        return response;
    } catch (error) {
        console.error('Error', error);
    }
}

export const featureDiagram = async() => {
    try {
        const response = await axiosInstance.get('/user/rose_chart');
        return response; 
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

export const playlistSongs = async(name) => {
    try {
        const response = await axiosInstance.post('/search', {name});
        return response;
    } catch (error) {
        console.error('Error', error);
    }
}

export const generateTracks = async(tracks) => {
    try {
        const response = await axiosInstance.post('/generated_tracks', {tracks});
        return response;
    } catch (error) {
        console.error('Error', error);
    }
}


export const createPlaylist = async(name, description, user_id) => {
    try {
        const response = await axiosInstance.post('/create_playlist', {name, description, user_id});
        return response;
    } catch (error) {
        console.error('Error', error);
    }
}

export const addImage = async(image, playlist_id) => {
    try {
        const response = await axiosInstance.post('/set_playlist_image', {image, playlist_id});
        return response;
    } catch (error) {
        console.error('Error', error);
    }
}

export const addToPlaylist = async(playlist_id, tracks) => {
    try {
        const response = await axiosInstance.post('/add_tracks', {playlist_id, tracks});
        return response;
    } catch (error) {
        console.error('Error', error);
    }
}

