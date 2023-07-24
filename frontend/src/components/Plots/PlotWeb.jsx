import React, { useEffect, useState } from 'react';
// import Plot from 'react-plotly.js';
import { featureDiagram } from 'src/util/functions';

function PlotWeb() {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await featureDiagram();
        const image = data.image;
        setPlotData(image);
      } catch (error) {
        console.error('Error fetching plot data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', position: 'relative'}}>
      {plotData ? (
        <img 
          src={`data:image/jpeg;base64,${plotData}`} 
          alt="Plot" 
          style={{position:'relative', width: '100%', imageRendering: 'auto', objectFit: 'cover', filter: 'brightness(1.2) contrast(1.1) saturate(1.2)'}}
            
        />
      ) : (

        <p style={{position:'relative'}}> <br/><br/>Loading plot data...</p>
      )}
    </div>
  );
}

export default PlotWeb;
