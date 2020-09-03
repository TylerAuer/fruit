import * as d3 from 'd3';

const drawEasyCor = () => {
  const imgSize = 35;

  // set the dimensions and margins of the graph
  const margin = imgSize;
  const width = 760 - 3 * margin;
  const height = 760 - 3 * margin;

  // append the svg object to the body of the page
  var svg = d3
    .select('#easy-cor-d3')
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', `0 0 760 760`)
    .append('g')
    .attr('transform', 'translate(' + 2 * margin + ',' + 2 * margin + ')');

  // Parse the Data
  d3.json('/data/correlation').then((data) => {
    // x scale
    const xScale = d3.scaleBand().domain(Object.keys(data)).range([0, width]);

    // y scale
    const yScale = d3.scaleBand().domain(Object.keys(data)).range([0, height]);

    // color scale for shading squares
    const colorScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range(['rgb(255, 255, 255)', 'rgb(255, 0, 183)'])
      .interpolate(d3.interpolateRgb);

    for (let fruitRow in data) {
      // Add squares
      const rowData = d3.entries(data[fruitRow].x);
      svg
        .selectAll(`${fruitRow}Row`)
        .data(rowData)
        .enter()
        .append('rect')
        .attr('stroke', '#000')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', 1.5)
        .attr('fill', (d) => colorScale(Math.abs(d.value)))
        .attr('x', (d) => xScale(d.key))
        .attr('y', yScale(fruitRow))
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth());
    }
  });
};

export default drawEasyCor;
