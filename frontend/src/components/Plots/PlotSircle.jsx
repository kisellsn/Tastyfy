import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { sircleDiagram } from 'src/util/functions';
import '../Menu/Menu.scss'

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
    <div className='image' style={{'aspectRatio': '1/1', position: 'relative'}}>
      {plotData ? (
        <Plot
          data={plotData.data}
          layout={plotData.layout}
          config={plotData.config}
          style={{ position:'relative', width: '100%', 'aspectRatio': '1/1'}}
        />
      ) : (

        <p className="loadingCircle"> <br/><br/>Loading plot data...</p>
      )}
    </div>
  );
}

export default PlotSircle;
