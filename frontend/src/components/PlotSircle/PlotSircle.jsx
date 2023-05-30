import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { sircleDiagram } from 'src/util/functions';

function PlotSircle() {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await sircleDiagram();
        setPlotData(data);
      } catch (error) {
        console.error('Error fetching plot data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', position: 'relative'}}>
      {plotData ? (
        <Plot
          data={plotData.data}
          layout={plotData.layout}
          style={{width: '340%', aspectRatio:'53/27', position:'absolute', left:'-90%'}}
        />
      ) : (

        <p style={{fontSize:'40px', textAlign:'center', marginLeft:'200px', position:'absolute'}}> <br/><br/>Loading plot data...</p>
      )}
    </div>
  );
}

export default PlotSircle;
