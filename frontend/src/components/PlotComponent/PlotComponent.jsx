import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { sircleDiagram } from 'src/util/functions';

function PlotComponent() {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    setPlotData(sircleDiagram())
  }, []);


  return (
    <div style={{width: '100%', position:'relative'}}>
      <h2>Plot</h2>
      {plotData ? (
        <div>
            <Plot
                data={plotData.data} // Assuming plotData has a 'data' property with plot data
                layout={plotData.layout} // Assuming plotData has a 'layout' property with layout options
                style={{width: '100%', position: 'relative'}}
            />
        </div>
      ) : (
        <p>Loading plot data...</p>
      )}
    </div>
  );
}

export default PlotComponent;
