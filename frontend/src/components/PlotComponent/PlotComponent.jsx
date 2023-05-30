import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { sircleDiagram } from 'src/util/functions';

function PlotComponent() {
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
      <h2>Plot</h2>
      {plotData ? (
        <Plot
          data={plotData.data}
          layout={plotData.layout}
          style={{width: '100%', }}
        />
      ) : (
        <p>Loading plot data...</p>
      )}
    </div>
  );
}

export default PlotComponent;
