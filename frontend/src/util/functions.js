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
        const response = await axios.get('/api/user/text');
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
        const response = await axios.post('/api/user/top_or_recently', { term: 'long_term' });
        return response.data;
    } catch (error) {
        console.error('Error', error);
    }
}