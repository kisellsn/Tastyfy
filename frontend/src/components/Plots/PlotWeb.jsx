import React, { useEffect, useState } from 'react';
// import Plot from 'react-plotly.js';
import { featureDiagram } from 'src/util/functions';

function PlotWeb({features, setCurrentFeatureIndex}) {
  const [plotData, setPlotData] = useState(null);
  const featureArray = Object.keys(features);

  const handleAreaClick = (title) => {
    const index = featureArray.indexOf(title);
    if (index !== -1) {
      setCurrentFeatureIndex(index);
    }
  };
  const handleMapClick = (event) => {
    event.preventDefault();
    const areaTitle = event.target.getAttribute('title');
    if (areaTitle) {
      handleAreaClick(areaTitle);
    }
  };
  

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
        <>
          <img src={`data:image/jpeg;base64,${plotData}`} alt="Plot" style={{ width: '100%', position: 'relative'}}/>
          <a title="Acousticness" onClick={handleMapClick} style={{top: "5%", left: "5%", width: "10%", height: "10%"}}></a>
          <a title="Danceability" onClick={handleMapClick} style={{top: "15%", left: "15%", width: "10%", height: "10%"}}></a>
          <a title="Energy" onClick={handleMapClick} style={{top: "25%", left: "25%", width: "10%", height: "10%"}}></a>
          <a title="Happiness" onClick={handleMapClick} style={{top: "35%", left: "35%", width: "10%", height: "10%"}}></a>
          <a title="Instrumentalness" onClick={handleMapClick} style={{top: "45%", left: "45%", width: "10%", height: "10%"}}></a>
          <a title="Liveness" onClick={handleMapClick} style={{top: "55%", left: "55%", width: "10%", height: "10%"}}></a>
          <a title="Loudness" onClick={handleMapClick} style={{top: "65%", left: "65%", width: "10%", height: "10%"}}></a>
         </>
      ) : (

        <p style={{position:'relative'}}> <br/><br/>Loading plot data...</p>
      )}
    </div>
  );
}

export default PlotWeb;
