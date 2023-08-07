import React, { useEffect, useState } from 'react';
// import Plot from 'react-plotly.js';
import { featureDiagram } from 'src/util/functions';
import FeatureSelector from './FeatureSelector';

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
    <div style={{display:'flex', flexDirection:'column'}}>
      <div className='featuresMobile'>
        <FeatureSelector featureArray={featureArray} setCurrentFeatureIndex={setCurrentFeatureIndex}/>
      </div>
      <div className="Web" style={{ width: '100%', position: 'relative'}}>
        {plotData ? (
          <>
            <img src={`data:image/jpeg;base64,${plotData}`} alt="Plot" style={{ width: '100%', position: 'relative'}}/>
            <button title="Acousticness" onClick={handleMapClick} style={{top: "5%", left: "40%"}}/>
            <button title="Danceability" onClick={handleMapClick} style={{top: "22%", left: "77%"}}/>
            <button title="Energy" onClick={handleMapClick} style={{top: "58%", left: "80%"}}/>
            <button title="Happiness" onClick={handleMapClick} style={{top: "87%", left: "62%"}}/>
            <button title="Instrumentalness" onClick={handleMapClick} style={{top: "87%", left: "12%"}}/>
            <button title="Liveness" onClick={handleMapClick} style={{top: "58%", left: "0%"}}/>
            <button title="Loudness" onClick={handleMapClick} style={{top: "22%", left: "5%"}}/>
          </>
        ) : (

          <p style={{position:'relative'}}> <br/><br/>Loading plot data...</p>
        )}
      </div>
    </div>
  );
}

export default PlotWeb;
