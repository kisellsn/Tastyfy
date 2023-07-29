import axios from 'axios';

export const registerSpotify = async () => {
    try {
        const response = await axios.get('/api/user');
        return response.data;
    } catch (error) {
        console.error('Error',error);
    }
    };
    
export const getToken = async () => {
    try {
        const response = await axios.get('/token');
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
};

export const getRecommendations = async() => {
    try {
        const response = await axios.get('/api/user/recommendations');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

export const postRecommendations = async(code) => {
    try {
        const response = await axios.post('/api/user/recommendations', { code: code });
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}


export const topDiagram = async() => {
    try {
        const response = await axios.get('/api/user/top_genres');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}


export const getText = async() => {
    try {
        const response = await axios.get('/api/user/genres_overview');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}


export const getRecs = async() => {
    try {
        const response = await axios.get('/api/user/recommendations');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}


export const sircleDiagram = async(term) => {
    try {
        if(term === 'start') term = 'current'
        const response = await axios.post('/api/user/diagram', {term});
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
}

export const getTops = async(term) => {
    try {
        if(term === 'start') term = 'current'
        const response = await axios.post('/api/user/top', {term});
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
}

export const featureDiagram = async() => {
    try {
        const response = await axios.get('/api/user/rose_chart');
        return response.data; 
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

export const playlistSongs = async(name) => {
    try {
        const response = await axios.post('/api/search', {name});
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
}

export const generateTracks = async(tracks) => {
    try {
        const response = await axios.post('/api/generated_tracks', {tracks});
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
}


export const createPlaylist = async(name, description, user_id, tracks) => {
    try {
        const response = await axios.post('/api/create_playlist', {name, description, user_id, tracks});
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
}

export const addImage = async(image, playlist_id) => {
    try {
        const response = await axios.post('/api/set_playlist_image', {image, playlist_id});
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
}


