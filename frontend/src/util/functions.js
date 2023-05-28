import axios from 'axios';

export function removeHashParams(value) {
    if (typeof value !== 'string') return '';
    const split = value.split('#');
    return split[0];
  }
const config = { 
    headers: {  
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }
export const registerSpotify = async (code) => {
    try {
        const response = await axios.post('/api/user', { code: removeHashParams(code) }, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    };

export const getToken = async () => {
    try {
        const response = await axios.get('/token');
        return response.data;
    } catch (error) {
        console.error('404', error);
    }
    };
