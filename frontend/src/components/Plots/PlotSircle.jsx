import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { sircleDiagram } from 'src/util/functions';
import '../Menu/Menu.scss'
import { getTopsLocal, newLocal } from 'src/util/local';

function PlotSircle({term, termRef}) {
  const [plotData, setPlotData] = useState(null); 


  useEffect(() => {
    async function fetchData() {
      try {
        let data = getTopsLocal('sircleDiagram');
        let topTermRef = getTopsLocal('topTerm');
        if (!data || topTermRef !== term){
          data = await sircleDiagram(term);
          newLocal('sircleDiagram', data)
          newLocal('topTerm', term)
        }
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
