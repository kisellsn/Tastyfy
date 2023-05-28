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

export const getRecommendations = async(code) => {
    try {
        const response = await axios.post('/api/user/recommendations', { code: code });
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
}

export const sircleDiagram = async() => {
    try {
        const response = await axios.post('/api/user/diagram', { term: 'current' });
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
}

export const getTops = async() => {
    try {
        const response = await axios.post('/api/user/top_or_recently', { term: 'current' });
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
}