import React, { useEffect, useState } from 'react';

import { featureDiagram } from 'src/util/functions';

function PlotWeb() {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await featureDiagram();
        setPlotData(data);
      } catch (error) {
        console.error('Error fetching plot data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: '90%', position: 'relative'}}>
      {plotData ? (
        <img src="plotData"/>
      ) : (

        <p style={{position:'relative', fontSize: '2vw'}}> <br/><br/>Loading plot data...</p>
      )}
    </div>
  );
}

export default PlotWeb;
