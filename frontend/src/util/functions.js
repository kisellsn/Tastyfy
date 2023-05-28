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
