import React, { useEffect, useState } from 'react';
import { sircleDiagram } from 'src/util/functions';

function PlotComponent() {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await sircleDiagram();
        setPlotData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching plot data:', error);
      }
    }

    fetchData();
  }, []);

  console.log(plotData);

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <h2>Plot</h2>
      {plotData ? (
        <div
          style={{ width: '200px', height: '200px', position: 'absolute' }}
          dangerouslySetInnerHTML={{ __html: plotData }}
        />
      ) : (
        <p>Loading plot data...</p>
      )}
    </div>
  );
}

export default PlotComponent;
