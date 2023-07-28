import axios from 'axios';
import React, { useEffect } from 'react';


const Callback = () => {
    useEffect(() => {
        const handleCallback = async (code) => {
          try {
            const response = await axios.post('/redirect', {code});
            const { link } = response.data;
            window.location.href = link;
          } catch (error) {
            console.error('Callback failed', error);
          }
        };
    
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
          handleCallback(code);
        }
      }, []);

    return (
        <></>
    )
};

export default Callback;