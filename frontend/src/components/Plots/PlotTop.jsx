import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { topDiagram } from 'src/util/functions';

function PlotTop() {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await topDiagram();
        data.config = {'displayModeBar': false, 'zoomIn': false, 'dragMode': false, 'responsive': true}
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
          config={plotData.config}
          style={{width: '100%', position:'relative'}}
        />
      ) : (

        <p style={{position:'relative', fontSize: '2vw'}}> <br/><br/>Loading plot data...</p>
      )}
    </div>
  );
}

export default PlotTop;
