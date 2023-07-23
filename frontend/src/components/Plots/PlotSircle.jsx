import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { sircleDiagram } from 'src/util/functions';

function PlotSircle({term}) {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await sircleDiagram(term);
        data.config = {'displayModeBar': false, 'zoomIn': false, 'dragMode': false, 'responsive': true}
        setPlotData(data);
      } catch (error) {
        console.error('Error fetching plot data:', error);
      }
    }

    fetchData();
  }, [term]);

  return (
    <div style={{ width: '150%', 'aspectRatio': '1/1', position: 'relative'}}>
      {plotData ? (
        <Plot
          data={plotData.data}
          layout={plotData.layout}
          config={plotData.config}
          style={{ position:'relative', width: '100%', 'aspectRatio': '1/1'}}
        />
      ) : (

        <p style={{fontSize:'40px', textAlign:'center', marginLeft:'200px', position:'absolute'}}> <br/><br/>Loading plot data...</p>
      )}
    </div>
  );
}

export default PlotSircle;
