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
          <img 
            src={`data:image/jpeg;base64,${plotData}`} 
            alt="Plot" 
            useMap="#workmap"
            style={{position:'relative', width: '100%'}}
              
          />
          <map name="workmap">
            <area title="Acousticness" shape="rect" coords="458,78,282,47" alt="Acousticness" onClick={handleMapClick} href="#"/>
            <area title="Danceability" shape="rect" coords="548,137,761,174" alt="Danceability" onClick={handleMapClick} href="#"/>
            <area title="Energy" shape="rect" coords="548,366,761,403" alt="Energy" onClick={handleMapClick} href="#"/>
            <area title="Happiness" shape="rect" coords="441,570,654,607" alt="Happiness" onClick={handleMapClick} href="#"/>
            <area title="Instrumentalness" shape="rect" coords="89,572,302,610" alt="Instrumentalness" onClick={handleMapClick} href="#"/>
            <area title="Liveness" shape="rect" coords="-21,363,193,401" alt="Liveness" onClick={handleMapClick} href="#"/>
            <area title="Loudness" shape="rect" coords="224,184,49,139" alt="Loudness" onClick={handleMapClick} href="#"/>
          </map>
        </>
      ) : (

        <p style={{position:'relative'}}> <br/><br/>Loading plot data...</p>
      )}
    </div>
  );
}

export default PlotWeb;
